# Changelog

Released features and fixed bugs. One file per release under [docs/changelog/](docs/changelog/),
named after its git tag; work not yet tagged is in [unreleased.md](docs/changelog/unreleased.md).

| Version | Date | Type | Highlights |
|---|---|---|---|
| [Unreleased](docs/changelog/unreleased.md) | — | — | On `main`, not yet tagged |
| [v1.0.3](docs/changelog/v1.0.3.md) | 2026-10-18 | patch | MIT licence, npm metadata, README badges |
| [v1.0.2](docs/changelog/v1.0.2.md) | 2026-10-18 | patch | First release on npm |
| [v1.0.1](docs/changelog/v1.0.1.md) | 2026-10-18 | patch | Last calendar column no longer clipped |
| [v1.0.0](docs/changelog/v1.0.0.md) | 2026-10-18 | initial | Gregorian, Jalali and Kurdish date and time picker |

## Adding entries

- Add changes to [unreleased.md](docs/changelog/unreleased.md) as they land on `main`.
- One line per user-visible change, not per commit. Say what changed for an app using the
  package, not which file moved.
- Groups, in order: **Features**, **Fixes**, **Performance**, **Security**, **Infrastructure**.
  Omit empty groups.
- Pick the version from what is in `unreleased.md`, per [SemVer](https://semver.org/):
  any **Features** entry means a minor bump (`v1.0.3` → `v1.1.0`); a release with only
  **Fixes**, **Performance**, **Security** or **Infrastructure** entries is a patch
  (`v1.0.3` → `v1.0.4`); a breaking change to a prop, an export or the CSS custom properties
  is a major.

## Cutting a release

1. Rename `unreleased.md` to `vX.Y.Z.md`, matching the git tag exactly.
2. Set its heading to `# vX.Y.Z — YYYY-MM-DD` and fill in the type, previous-release link
   and diff range, as in the existing files. Add a `Next:` link to the previous release's file.
3. Create a fresh `unreleased.md`.
4. Add a row to the top of the table above.
5. Bump `version` in `package.json`, then release as in the README's
   [Releasing](README.md#releasing) steps.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
