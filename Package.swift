// swift-tools-version:5.9
import PackageDescription

// Touch Grass design tokens as a Swift package.
// The Swift source is auto-generated from packages/tokens/src/*.json
// via Style Dictionary. Run `pnpm tokens` to regenerate.
let package = Package(
    name: "TouchGrassTokens",
    platforms: [
        .iOS(.v15),
        .macOS(.v12)
    ],
    products: [
        .library(
            name: "TouchGrassTokens",
            targets: ["TouchGrassTokens"]
        ),
        .library(
            name: "TouchGrassUI",
            targets: ["TouchGrassUI"]
        )
    ],
    targets: [
        .target(
            name: "TouchGrassTokens",
            path: "packages/tokens/Sources"
        ),
        .target(
            name: "TouchGrassUI",
            dependencies: ["TouchGrassTokens"],
            path: "packages/ios/Sources"
        ),
        .testTarget(
            name: "TouchGrassUITests",
            dependencies: ["TouchGrassUI"],
            path: "packages/ios/Tests",
            resources: [
                .process("Fixtures")
            ]
        )
    ]
)
