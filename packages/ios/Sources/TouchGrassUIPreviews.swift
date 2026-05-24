#if DEBUG
import SwiftUI

private enum TGPreviewData {
    static let leaderboard: [TGLeaderboardEntry] = [
        TGLeaderboardEntry(id: "u1", rank: 1, displayName: "Alex", focusMinutes: 482, deltaMinutes: -22, streakDays: 14),
        TGLeaderboardEntry(id: "u2", rank: 2, displayName: "You", focusMinutes: 455, deltaMinutes: -35, streakDays: 9, isCurrentUser: true),
        TGLeaderboardEntry(id: "u3", rank: 2, displayName: "Sam", focusMinutes: 455, deltaMinutes: -12, streakDays: 11, tiedAtRank: true)
    ]

    static let content = TGCompetitionLoopData(
        entries: leaderboard,
        streakDays: 9,
        sessionsCompleted: 22,
        screenTimeSavedMinutes: 420,
        challengeTitle: "Beat your record",
        challengeFriend: "Alex",
        challengePeriod: "This week"
    )
}

struct TGCompetitionLoopScreen_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            TGCompetitionLoopScreen(state: .loading)
                .previewDisplayName("Competition · Loading")

            TGCompetitionLoopScreen(state: .offline)
                .previewDisplayName("Competition · Offline")

            TGCompetitionLoopScreen(state: .empty)
                .previewDisplayName("Competition · Empty")

            TGCompetitionLoopScreen(state: .content(TGPreviewData.content))
                .previewDisplayName("Competition · Content")
        }
        .preferredColorScheme(.dark)
        .background(TGTheme.bg)
    }
}

struct TGLeaderboardRow_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            TGLeaderboardRow(entry: TGPreviewData.leaderboard[1])
                .previewDisplayName("Row · Current User")
            TGLeaderboardRow(entry: TGPreviewData.leaderboard[2])
                .previewDisplayName("Row · Tied Rank")
        }
        .padding(TGTheme.cardPadding)
        .background(TGTheme.bg)
        .preferredColorScheme(.dark)
    }
}

struct TGPrimitives_Previews: PreviewProvider {
    static var previews: some View {
        VStack(spacing: TGTheme.rowPadding) {
            TGButton("Start challenge", action: {})
            TGButton("Retry", variant: .secondary, action: {})
            TGButton("Loading", isLoading: true, action: {})
            TGStat(label: "Today", value: "2H 10M", deltaMinutes: -20)
            TGTimer(totalSeconds: 1500, remainingSeconds: 805)
        }
        .padding(TGTheme.cardPadding)
        .background(TGTheme.bg)
        .preferredColorScheme(.dark)
        .previewDisplayName("Primitives")
    }
}
#endif
