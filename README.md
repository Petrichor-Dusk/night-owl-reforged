# Night Owl Reforged 🌌

![VS Code Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/petrichoral.night-owl-reforged)
![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/petrichoral.night-owl-reforged)

A maintained fork of [Night Owl](https://github.com/sdras/night-owl-vscode-theme) by Sarah Drasner. The syntax palette is unchanged — this fork exists to fix the workbench details that have drifted since upstream was last updated, starting with tab states that you can actually read.

> Original theme and design by [Sarah Drasner](https://github.com/sdras), MIT licensed — see [LICENSE.md](./LICENSE.md). If you want the upstream theme, install [Night Owl](https://marketplace.visualstudio.com/items?itemName=sdras.night-owl) instead.

## What this fork changes

- **The active tab is finally visible.** Upstream relied on `tab.activeBorder`, which modern VS Code no longer renders, so the active tab differed from the others by a barely perceptible shade. It now gets a `#82aaff` accent line (Light Owl: `#2AA298`) plus stronger surface contrast, with the tab bar recessed behind it.
- **Inactive tab text is dimmed** instead of being the same colour as the active tab (the light themes used `#403f53` for both).
- **Adds the tab states upstream never defined**: `hover`, `selected`, `unfocused*`, `lastPinnedBorder`, `dragAndDropBorder`, `divider`.
- All four variants — Night, Night no-italics, Light, Light no-italics — get the same treatment.

### Tab palette (dark)

| token | colour |
| --- | --- |
| tab bar background | `#01111d` |
| active tab | `#0b2942` + `#82aaff` top accent |
| inactive tab | `#01111d` |
| hovered tab | `#0b2135` |
| selected tab in an inactive group | `#0e293f` |

## Optional editor background image

The extension can paint a background image behind the editor. A Night Owl starfield ships inside the extension, and you can swap in your own image.

| Command | What it does |
| --- | --- |
| `Night Owl Reforged: Enable Background Image` | Injects the bundled starfield behind the editor |
| `Night Owl Reforged: Use Custom Background Image…` | Pick any jpg/png/webp/gif; it is copied into the extension's storage and used instead |
| `Night Owl Reforged: Disable Background Image` | Restores the original workbench stylesheet |

Tune how much the image is dimmed with `nightOwlReforged.overlayOpacity` (0–1, default `0.82`), then re-run *Enable Background Image*.

Two things you should know before using it:

- This works by appending CSS to VS Code's `workbench.desktop.main.css`, because VS Code has no API for UI backgrounds. After the restart, VS Code reports that the installation **appears to be corrupt** — choose **"Don't Show Again"**.
- A VS Code update replaces that stylesheet, so the background disappears after an update. Re-run *Enable Background Image*. The theme itself is unaffected either way.

## Upstream theme

Night Owl is a Visual Studio Code theme for the night owls out there. Fine-tuned for those of us who like to code late into the night. Color choices have taken into consideration what is accessible to people with colorblindness and in low-light circumstances. Decisions were also based on meaningful contrast for reading comprehension and for optimal razzle dazzle. ✨

Light Owl is color balanced from the Dark version for easy viewing in daylight. 🌅

About the original theme, and some of the considerations made while creating it (as well as _how_ to create it should you want to make your own): [https://css-tricks.com/creating-a-vs-code-theme/](https://css-tricks.com/creating-a-vs-code-theme/)

## Night Owl

![First Screen](first-screen.jpg)
![Night Owl Frameworks](three-dark.jpg)

## Light Owl

![First Screen Light](light-owl-full.jpg)
![Light Owl Frameworks](three-light.jpg)

# Installation

1.  Install [Visual Studio Code](https://code.visualstudio.com/)
2.  Launch Visual Studio Code
3.  Choose **Extensions** from menu
4.  Search for `night owl reforged`
5.  Click **Install** to install it
6.  Click **Reload** to reload the Code
7.  From the menu bar click: Code > Preferences > Color Theme > **Night Owl Reforged**

## Disable Italics

If you wish to disable italics, there is a no-italic theme available. You will have access to both, select **Night Owl Reforged (No Italics)** as your color theme.

## Other versions

The community is awesome and has ported this theme over to other environments.

#### Dark Theme

- Hyper: [https://github.com/pbomb/hyper-night-owl](https://github.com/pbomb/hyper-night-owl)
- iTerm2
  1.  [https://github.com/nickcernis/iterm2-night-owl](https://github.com/nickcernis/iterm2-night-owl)
  2.  [https://github.com/jsit/night-owl-iterm2-theme](https://github.com/jsit/night-owl-iterm2-theme)
  3.  [https://github.com/florianeckerstorfer/night-owl-itermcolors](https://github.com/florianeckerstorfer/night-owl-itermcolors)
  4.  [https://github.com/andrewfluck/night-owl-iterm2](https://github.com/andrewfluck/night-owl-iterm2)
- Xresources: [https://github.com/alochaus/night-owl-xresources-theme](https://github.com/alochaus/night-owl-xresources-theme)
- Atom: [https://atom.io/themes/night-owl-vs-code-syntax](https://atom.io/themes/night-owl-vs-code-syntax)
- Jetbrains: [https://github.com/xdrop/night-owl-jetbrains](https://github.com/xdrop/night-owl-jetbrains)
- Emacs: [https://github.com/aaronjensen/night-owl-emacs](https://github.com/aaronjensen/night-owl-emacs)
- Vim
  1. [https://github.com/Khaledgarbaya/night-owl-vim-theme](https://github.com/Khaledgarbaya/night-owl-vim-theme)
  2. [https://github.com/haishanh/night-owl.vim](https://github.com/haishanh/night-owl.vim)
- Pygments [https://github.com/liamdawson/nightowl-pygments-style](https://github.com/liamdawson/nightowl-pygments-style)
- Alfred: [https://github.com/jbharat/night-owl-alfred-theme](https://github.com/jbharat/night-owl-alfred-theme)
- Ulauncher: [https://github.com/christoph-fricke/ulauncher-night-owl-theme](https://github.com/christoph-fricke/ulauncher-night-owl-theme)
- TextMate [https://github.com/batpigandme/night-owlish](https://github.com/batpigandme/night-owlish/tree/master/tmTheme)
- Ace Editor [https://github.com/batpigandme/night-owlish](https://github.com/batpigandme/night-owlish/tree/master/aceTheme)
- RStudio [https://github.com/batpigandme/night-owlish](https://github.com/batpigandme/night-owlish/tree/master/rstheme)
- Insomnia [https://github.com/yoannfleurydev/insomnia-plugin-night-owl-theme](https://github.com/yoannfleurydev/insomnia-plugin-night-owl-theme)
- Sublime Text 3 [https://github.com/VonHeikemen/night-owl-sublime-scheme](https://github.com/VonHeikemen/night-owl-sublime-scheme)
- Slack [https://github.com/clouby/night-owl-slack](https://github.com/clouby/night-owl-slack)
- Xcode [https://github.com/stealthanthrax/xcode-Night-Owl](https://github.com/stealthanthrax/xcode-Night-Owl)
- Visual Studio 2019: [https://github.com/kai-oswald/NightOwl-VS-Theme](https://github.com/kai-oswald/NightOwl-VS-Theme)
- Visual Studio 2022: [https://github.com/SumitKar01/NightOwl-Theme-VS-2022](https://github.com/SumitKar01/NightOwl-Theme-VS-2022)
- Prism [https://github.com/SaraVieira/prism-theme-night-owl](https://github.com/SaraVieira/prism-theme-night-owl)
- Windows Terminal [https://github.com/edurojasr/Windows_Terminal_Theme_Night_Owl](https://github.com/edurojasr/Windows_Terminal_Theme_Night_Owl)
- Alacritty: [https://github.com/alacritty/alacritty](https://github.com/alacritty/alacritty/wiki/Color-schemes)
- Terminology: [https://github.com/LividJava/night-owl-terminology](https://github.com/LividJava/night-owl-terminology)
- Gnome Terminal: [https://github.com/edurojasr/night-owl-gnome-terminal](https://github.com/edurojasr/night-owl-gnome-terminal)
- Kitty [https://github.com/Glazy/night-owl-kitty-theme](https://github.com/Glazy/night-owl-kitty-theme)
- Ghostty [https://github.com/m1yon/ghostty-night-owl](https://github.com/m1yon/ghostty-night-owl)

#### Light Theme

- iTerm2: [https://github.com/fcaldera/night-owl-light-iterm2](https://github.com/fcaldera/night-owl-light-iterm2)
- Vim: [https://github.com/macguirerintoul/night_owl_light.vim](https://github.com/macguirerintoul/night_owl_light.vim)
- Tilix: [https://github.com/johanhammar/light-owl-tilix](https://github.com/johanhammar/light-owl-tilix)
- Alacritty: [https://github.com/nik27/night-owl-alacritty-theme](https://github.com/nik27/night-owl-alacritty-theme)
- Ghostty: [https://github.com/m1yon/ghostty-night-owl](https://github.com/m1yon/ghostty-night-owl)

## Separate the Editor from the Sidebar

This theme uses contrast sparingly so that when it's applied, it's more meaningful. This can help reduce noise and improve your ability to scan. However, some of the decisions may not work for everyone. One such decision that some disagree on is whether or not to have a separation between the editor and sidebar, and the amount of contrast. If you wish for this to have more visual significance, please paste this into your user settings preferences. These are my recommendations for these settings but you can use whatever colors you wish. ☺️

```
"workbench.colorCustomizations": {
  "[Night Owl]": {
    "activityBar.background": "#000C1D",
    "activityBar.border": "#102a44",
    "editorGroup.border": "#102a44",
    "sideBar.background": "#001122",
    "sideBar.border": "#102a44",
    "sideBar.foreground": "#8BADC1"
  },
  "[Night Owl (No Italics)]": {
    "activityBar.background": "#000C1D",
    "activityBar.border": "#102a44",
    "editorGroup.border": "#102a44",
    "sideBar.background": "#001122",
    "sideBar.border": "#102a44",
    "sideBar.foreground": "#8BADC1"
  }
},
```

## Preferences shown in the preview

The font in the preview image is Dank Mono, [available here](https://philpl.gumroad.com/l/dank-mono). Editor settings to activate font ligatures:

```
"editor.fontFamily": "Dank Mono",
"editor.fontLigatures": true,
```

## Misc

This is my first foray into creating a theme, so if you see something amiss, please feel free to [file an issue](https://github.com/sdras/night-owl-vscode-theme/issues)! I'm sure there are things I missed.

If you use [the VS Code Babel extension](https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel), you may see some inconsistencies in color for JSX, that's not coming from this theme.

Any relevant changes for each version are documented in the changelog. Please update and check the changelog before filing any issues, as they may have already been taken care of.

This palette was inspired in part by Material Palenight [Theme](https://marketplace.visualstudio.com/items?itemName=whizkydee.material-palenight-theme), and the accessibility idea was inspired in part by Solarized [Themes](http://ethanschoonover.com/solarized)
