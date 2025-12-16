## [1.0.2](https://github.com/webgrip/backstage-application/compare/1.0.1...1.0.2) (2025-12-16)

### Fixed

* made the github integration work through env vars instead of an included file with secrets ([280d0f7](https://github.com/webgrip/backstage-application/commit/280d0f7a20e6b85c3f20b232510982ed12d85cdb))

## [1.0.1](https://github.com/webgrip/backstage-application/compare/1.0.0...1.0.1) (2025-12-16)

### Fixed

* **workflows:** set context and dockerfile manually for this exception ([111ebaa](https://github.com/webgrip/backstage-application/commit/111ebaa343018283c24ffcea3f1f3163e49b173d))

## 1.0.0 (2025-12-16)

### Fixed

* added package.json needed to release ([9738e79](https://github.com/webgrip/backstage-application/commit/9738e798f6a51bfa891608d69973628972513c56))
* also rebuild on package.json ([8f62b94](https://github.com/webgrip/backstage-application/commit/8f62b943579fb7095228fec93d7b28f87764e6ca))
* logger should not log everything, it was super verbose ([2113876](https://github.com/webgrip/backstage-application/commit/21138766ba2a77e1fc64804d64fbf740436c6580))
* **typo:** webgrip ([c1658e4](https://github.com/webgrip/backstage-application/commit/c1658e40018f2aaee4233a3581bf9a7ea4f91c87))
* updated from 1.38 to 1.45 with https://backstage.github.io/upgrade-helper/?yarnPlugin=0&from=1.38.0&to=1.45.0 ([cdff51b](https://github.com/webgrip/backstage-application/commit/cdff51b009e595b477bb33266a66e4aa25218aa9))
* updated from an even older version apparently. Ensured parity ([573de97](https://github.com/webgrip/backstage-application/commit/573de97e67c1014ddb6c0cf5bc48706a65d2ad88))
* use custom auth provider to circumvent not being able to log in with users imported from github with a namespace ([67a1f39](https://github.com/webgrip/backstage-application/commit/67a1f39a43e8a33b1cab9747e8cdb71ce7e937b5))

### Changed

* Moved backstage into src/ and adhere to my "application" standards fully ([86e21b9](https://github.com/webgrip/backstage-application/commit/86e21b9f877953884f7df62e2e62bf8115031be2))
