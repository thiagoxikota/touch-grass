import XCTest
@testable import TouchGrassUI
import SwiftUI
#if canImport(UIKit)
import UIKit
import CryptoKit
#endif

final class LeaderboardSnapshotTests: XCTestCase {
    func testLeaderboardCurrentUserRenderedSnapshotHash() throws {
        #if canImport(UIKit)
        let hash = renderSnapshotHash(
            TGLeaderboardRow(
                entry: TGLeaderboardEntry(
                    id: "you",
                    rank: 2,
                    displayName: "You",
                    focusMinutes: 455,
                    deltaMinutes: -35,
                    streakDays: 9,
                    isCurrentUser: true
                )
            ),
            size: CGSize(width: 390, height: 92)
        )
        try assertGoldenHash(hash, key: "leaderboard-current-user")
        #else
        throw XCTSkip("Rendered snapshot hashing requires UIKit.")
        #endif
    }

    func testLeaderboardTiedRankRenderedSnapshotHash() throws {
        #if canImport(UIKit)
        let hash = renderSnapshotHash(
            TGLeaderboardRow(
                entry: TGLeaderboardEntry(
                    id: "sam",
                    rank: 2,
                    displayName: "Sam",
                    focusMinutes: 455,
                    deltaMinutes: -12,
                    streakDays: 11,
                    tiedAtRank: true
                )
            ),
            size: CGSize(width: 390, height: 92)
        )
        try assertGoldenHash(hash, key: "leaderboard-tied-rank")
        #else
        throw XCTSkip("Rendered snapshot hashing requires UIKit.")
        #endif
    }

    func testLeaderboardAccessibilitySnapshot() {
        let entry = TGLeaderboardEntry(
            id: "alex",
            rank: 1,
            displayName: "Alex",
            focusMinutes: 482,
            deltaMinutes: -22,
            streakDays: 14
        )

        XCTAssertEqual(
            TGFormat.leaderboardAccessibility(entry: entry),
            "Rank 1, Alex, 482 minutes focused, -22m this week, 14 day streak"
        )
    }

    func testLeaderboardRenderedVariantsProduceDifferentHashes() throws {
        #if canImport(UIKit)
        let currentUserHash = renderSnapshotHash(
            TGLeaderboardRow(
                entry: TGLeaderboardEntry(
                    id: "you",
                    rank: 2,
                    displayName: "You",
                    focusMinutes: 455,
                    deltaMinutes: -35,
                    streakDays: 9,
                    isCurrentUser: true
                )
            ),
            size: CGSize(width: 390, height: 92)
        )
        let tiedHash = renderSnapshotHash(
            TGLeaderboardRow(
                entry: TGLeaderboardEntry(
                    id: "sam",
                    rank: 2,
                    displayName: "Sam",
                    focusMinutes: 455,
                    deltaMinutes: -12,
                    streakDays: 11,
                    tiedAtRank: true
                )
            ),
            size: CGSize(width: 390, height: 92)
        )

        XCTAssertNotEqual(currentUserHash, tiedHash)
        #else
        throw XCTSkip("Rendered snapshot hashing requires UIKit.")
        #endif
    }
}

#if canImport(UIKit)
private struct SnapshotFixtures: Decodable {
    let leaderboardCurrentUser: String
    let leaderboardTiedRank: String

    enum CodingKeys: String, CodingKey {
        case leaderboardCurrentUser = "leaderboard-current-user"
        case leaderboardTiedRank = "leaderboard-tied-rank"
    }
}

private struct WritableSnapshotFixtures: Codable {
    var leaderboardCurrentUser: String
    var leaderboardTiedRank: String

    init(from current: SnapshotFixtures) {
        leaderboardCurrentUser = current.leaderboardCurrentUser
        leaderboardTiedRank = current.leaderboardTiedRank
    }
}

private func assertGoldenHash(_ hash: String, key: String) throws {
    XCTAssertEqual(hash.count, 64)
    XCTAssertNotEqual(hash, String(repeating: "0", count: 64))

    let fixtures = loadSnapshotFixtures()
    var writable = WritableSnapshotFixtures(from: fixtures)

    if ProcessInfo.processInfo.environment["UPDATE_TG_GOLDENS"] == "1" {
        switch key {
        case "leaderboard-current-user":
            writable.leaderboardCurrentUser = hash
        case "leaderboard-tied-rank":
            writable.leaderboardTiedRank = hash
        default:
            XCTFail("Unknown snapshot key: \(key)")
            return
        }

        if writeSnapshotFixtures(writable) {
            throw XCTSkip("Updated golden hash for \(key). Re-run tests without UPDATE_TG_GOLDENS.")
        }
        XCTFail("Failed writing updated fixtures for \(key).")
        return
    }

    let expected: String
    switch key {
    case "leaderboard-current-user":
        expected = fixtures.leaderboardCurrentUser
    case "leaderboard-tied-rank":
        expected = fixtures.leaderboardTiedRank
    default:
        XCTFail("Unknown snapshot key: \(key)")
        return
    }

    if expected.isEmpty {
        throw XCTSkip("Missing golden hash for \(key). Run UPDATE_TG_GOLDENS=1 on an iOS-capable runner, then commit fixtures.")
    }
    XCTAssertEqual(hash, expected)
}

private func loadSnapshotFixtures() -> SnapshotFixtures {
    guard
        let url = Bundle.module.url(forResource: "leaderboard-snapshot-hashes", withExtension: "json"),
        let data = try? Data(contentsOf: url),
        let fixtures = try? JSONDecoder().decode(SnapshotFixtures.self, from: data)
    else {
        XCTFail("Unable to load snapshot fixture file.")
        return SnapshotFixtures(leaderboardCurrentUser: "", leaderboardTiedRank: "")
    }

    return fixtures
}

private func writeSnapshotFixtures(_ fixtures: WritableSnapshotFixtures) -> Bool {
    let encoder = JSONEncoder()
    encoder.outputFormatting = [.prettyPrinted, .sortedKeys]
    guard let data = try? encoder.encode(fixtures) else { return false }

    let directory = URL(fileURLWithPath: #filePath).deletingLastPathComponent().appendingPathComponent("Fixtures")
    let fileURL = directory.appendingPathComponent("leaderboard-snapshot-hashes.json")
    do {
        try data.write(to: fileURL, options: [.atomic])
        return true
    } catch {
        return false
    }
}

private func renderSnapshotHash<V: View>(_ view: V, size: CGSize) -> String {
    let hosting = UIHostingController(rootView: view.background(Color.black))
    hosting.view.bounds = CGRect(origin: .zero, size: size)
    hosting.view.backgroundColor = .black

    let format = UIGraphicsImageRendererFormat.default()
    format.scale = 1
    let renderer = UIGraphicsImageRenderer(size: size, format: format)
    let image = renderer.image { _ in
        hosting.view.drawHierarchy(in: hosting.view.bounds, afterScreenUpdates: true)
    }

    guard let pngData = image.pngData() else { return String(repeating: "0", count: 64) }
    return SHA256.hash(data: pngData).map { String(format: "%02x", $0) }.joined()
}
#endif
