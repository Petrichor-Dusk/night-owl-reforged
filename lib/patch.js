'use strict';

const fs = require('fs');
const path = require('path');

const START = '/* === night-owl-reforged:background:start === */';
const END = '/* === night-owl-reforged:background:end === */';
const BACKUP_SUFFIX = '.night-owl-reforged.bak';

const MIME = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
};

function findCssPath(appRoot) {
  const outDir = path.join(appRoot, 'out', 'vs', 'workbench');
  for (const name of ['workbench.desktop.main.css', 'workbench.web.main.css']) {
    const candidate = path.join(outDir, name);
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

function buildCss(dataUri, opacity) {
  const alpha = Math.min(1, Math.max(0, Number(opacity)));
  const surface = '.monaco-workbench .part.editor > .content';
  const editor = `${surface} .editor-group-container > .editor-container > .monaco-editor`;
  return [
    START,
    `${surface} .editor-group-container {`,
    `  background-image: linear-gradient(rgba(1, 22, 39, ${alpha}), rgba(1, 22, 39, ${alpha})), url("${dataUri}") !important;`,
    '  background-size: cover !important;',
    '  background-position: center center !important;',
    '  background-repeat: no-repeat !important;',
    '}',
    `${surface},`,
    `${editor},`,
    `${editor} .margin,`,
    `${editor} .monaco-editor-background,`,
    `${editor} .overflow-guard,`,
    `${editor} .scroll-decoration {`,
    '  background-color: transparent !important;',
    '}',
    END,
  ].join('\n');
}

function readPristine(cssPath) {
  const backup = cssPath + BACKUP_SUFFIX;
  if (fs.existsSync(backup)) return fs.readFileSync(backup, 'utf8');
  const current = fs.readFileSync(cssPath, 'utf8');
  const start = current.indexOf(START);
  return start === -1 ? current : current.slice(0, start).replace(/\s+$/, '') + '\n';
}

function applyPatch({ cssPath, imagePath, opacity = 0.82 }) {
  const mime = MIME[path.extname(imagePath).toLowerCase()];
  if (!mime) throw new Error(`Unsupported image type: ${path.extname(imagePath)}`);
  const dataUri = `data:${mime};base64,${fs.readFileSync(imagePath).toString('base64')}`;
  const backup = cssPath + BACKUP_SUFFIX;
  if (!fs.existsSync(backup)) fs.copyFileSync(cssPath, backup);
  const pristine = readPristine(cssPath);
  fs.writeFileSync(cssPath, `${pristine}\n${buildCss(dataUri, opacity)}\n`, 'utf8');
}

function removePatch({ cssPath }) {
  const backup = cssPath + BACKUP_SUFFIX;
  if (fs.existsSync(backup)) {
    fs.copyFileSync(backup, cssPath);
    fs.unlinkSync(backup);
    return true;
  }
  const current = fs.readFileSync(cssPath, 'utf8');
  const start = current.indexOf(START);
  const end = current.indexOf(END);
  if (start === -1 || end === -1) return false;
  fs.writeFileSync(cssPath, current.slice(0, start) + current.slice(end + END.length), 'utf8');
  return true;
}

function isPatched(cssPath) {
  try {
    return fs.readFileSync(cssPath, 'utf8').includes(START);
  } catch {
    return false;
  }
}

module.exports = { START, END, BACKUP_SUFFIX, findCssPath, buildCss, applyPatch, removePatch, isPatched };
