'use strict';

const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const patcher = require('./lib/patch.js');

const BUNDLED_IMAGE = path.join('assets', 'background-night-owl.jpg');
const STATE_KEY = 'activeBackgroundPath';

function requireCssPath() {
  const cssPath = patcher.findCssPath(vscode.env.appRoot);
  if (!cssPath) {
    throw new Error(
      `Could not find workbench stylesheet under ${path.join(vscode.env.appRoot, 'out', 'vs', 'workbench')}`
    );
  }
  return cssPath;
}

function overlayOpacity() {
  return vscode.workspace.getConfiguration('nightOwlReforged').get('overlayOpacity', 0.82);
}

async function notifyAndOfferReload(context, message) {
  const restart = 'Restart Now';
  const clear = 'Clear stored image';
  const choice = await vscode.window.showInformationMessage(
    `${message} VS Code will warn that the installation appears corrupt — pick "Don't Show Again".`,
    restart,
    ...(context && context.globalState.get(STATE_KEY) ? [clear] : [])
  );
  if (choice === restart) {
    await vscode.commands.executeCommand('workbench.action.reloadWindow');
  } else if (choice === clear && context) {
    await clearStoredImage(context);
  }
}

async function patchWith(context, imagePath) {
  const cssPath = requireCssPath();
  patcher.applyPatch({ cssPath, imagePath, opacity: overlayOpacity() });
}

async function clearStoredImage(context) {
  const stored = context.globalState.get(STATE_KEY);
  if (stored) {
    try {
      fs.unlinkSync(stored);
    } catch {
      // already gone
    }
  }
  await context.globalState.update(STATE_KEY, undefined);
}

function resolveActiveImage(context) {
  const stored = context.globalState.get(STATE_KEY);
  if (stored && fs.existsSync(stored)) return stored;
  return path.join(context.extensionUri.fsPath, BUNDLED_IMAGE);
}

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand('nightOwlReforged.enableBackground', async () => {
      try {
        const imagePath = resolveActiveImage(context);
        if (!fs.existsSync(imagePath)) {
          throw new Error(`Background image not found: ${imagePath}`);
        }
        await patchWith(context, imagePath);
        await notifyAndOfferReload(context, `Background image enabled (${path.basename(imagePath)}). Restart VS Code to apply.`);
      } catch (error) {
        vscode.window.showErrorMessage(
          `Night Owl Reforged: ${error.message}. If this is a permission error, VS Code is probably installed system-wide — republish from a per-user install or run VS Code as administrator once.`
        );
      }
    }),

    vscode.commands.registerCommand('nightOwlReforged.useCustomBackground', async () => {
      try {
        const picked = await vscode.window.showOpenDialog({
          canSelectMany: false,
          openLabel: 'Use as background',
          filters: { Images: ['jpg', 'jpeg', 'png', 'webp', 'gif'] },
        });
        if (!picked || picked.length === 0) return;

        const source = picked[0].fsPath;
        const target = path.join(context.globalStorageUri.fsPath, `background${path.extname(source).toLowerCase()}`);
        fs.mkdirSync(context.globalStorageUri.fsPath, { recursive: true });
        fs.copyFileSync(source, target);
        await context.globalState.update(STATE_KEY, target);

        await patchWith(context, target);
        await notifyAndOfferReload(context, `Background image replaced with ${path.basename(source)}. Restart VS Code to apply.`);
      } catch (error) {
        vscode.window.showErrorMessage(`Night Owl Reforged: ${error.message}`);
      }
    }),

    vscode.commands.registerCommand('nightOwlReforged.disableBackground', async () => {
      try {
        const cssPath = requireCssPath();
        const changed = patcher.removePatch({ cssPath });
        await notifyAndOfferReload(
          context,
          changed ? 'Background image removed. Restart VS Code to apply.' : 'No background image was installed.'
        );
      } catch (error) {
        vscode.window.showErrorMessage(`Night Owl Reforged: ${error.message}`);
      }
    })
  );
}

function deactivate() {}

module.exports = { activate, deactivate };
