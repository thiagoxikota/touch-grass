import SwiftUI

public struct TGCompetitionLoopData {
    public let entries: [TGLeaderboardEntry]
    public let streakDays: Int
    public let sessionsCompleted: Int
    public let screenTimeSavedMinutes: Int
    public let challengeTitle: String
    public let challengeFriend: String
    public let challengePeriod: String

    public init(
        entries: [TGLeaderboardEntry],
        streakDays: Int,
        sessionsCompleted: Int,
        screenTimeSavedMinutes: Int,
        challengeTitle: String,
        challengeFriend: String,
        challengePeriod: String
    ) {
        self.entries = entries
        self.streakDays = streakDays
        self.sessionsCompleted = sessionsCompleted
        self.screenTimeSavedMinutes = screenTimeSavedMinutes
        self.challengeTitle = challengeTitle
        self.challengeFriend = challengeFriend
        self.challengePeriod = challengePeriod
    }
}

public enum TGCompetitionLoopState {
    case loading
    case offline
    case empty
    case content(TGCompetitionLoopData)
}

public struct TGCompetitionLoopScreen: View {
    private let state: TGCompetitionLoopState
    private let onRetry: () -> Void
    private let onInviteFriends: () -> Void
    private let onStartChallenge: () -> Void

    public init(
        state: TGCompetitionLoopState,
        onRetry: @escaping () -> Void = {},
        onInviteFriends: @escaping () -> Void = {},
        onStartChallenge: @escaping () -> Void = {}
    ) {
        self.state = state
        self.onRetry = onRetry
        self.onInviteFriends = onInviteFriends
        self.onStartChallenge = onStartChallenge
    }

    public var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: TGTheme.sectionGap) {
                header

                switch state {
                case .loading:
                    loadingBlock
                case .offline:
                    offlineBlock
                case .empty:
                    emptyBlock
                case .content(let data):
                    contentBlock(data)
                }
            }
            .padding(TGTheme.cardPadding)
        }
        .background(TGTheme.bg.ignoresSafeArea())
    }

    private var header: some View {
        VStack(alignment: .leading, spacing: TGTheme.inlineGap) {
            Text("WEEKLY LEADERBOARD")
                .font(.system(size: TGTheme.fontLabel, weight: TGTheme.fontWeightSemibold, design: .monospaced))
                .foregroundStyle(TGTheme.fgMuted)
            Text("PROVE YOUR FOCUS")
                .font(.system(size: TGTheme.fontH3, weight: TGTheme.fontWeightBold, design: .monospaced))
                .foregroundStyle(TGTheme.fg)
        }
        .accessibilityElement(children: .combine)
        .accessibilityLabel("Weekly leaderboard. Prove your focus.")
    }

    private var loadingBlock: some View {
        VStack(spacing: TGTheme.inlineGap) {
            TGCard(title: "Loading") {
                Text("█ ▓ ▒ ░ SYNCING COMPETITION")
                    .font(.system(size: TGTheme.fontBody, weight: TGTheme.fontWeightSemibold, design: .monospaced))
                    .foregroundStyle(TGTheme.fgMuted)
            }

            ForEach(0..<4, id: \.self) { _ in
                Rectangle()
                    .fill(TGTheme.bgAlt)
                    .frame(height: TGTheme.skeletonRowHeight)
                    .overlay(Rectangle().stroke(TGTheme.hairline, lineWidth: TGTheme.borderWidth))
            }
        }
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("Loading leaderboard")
    }

    private var offlineBlock: some View {
        TGCard(title: "Offline") {
            Text("NO CONNECTION. LAST STATS ARE STALE.")
                .font(.system(size: TGTheme.fontBody, weight: TGTheme.fontWeightSemibold, design: .monospaced))
                .foregroundStyle(TGTheme.fg)
            TGButton("Retry", variant: .secondary, action: onRetry)
        }
        .accessibilityElement(children: .contain)
    }

    private var emptyBlock: some View {
        TGCard(title: "No friends yet") {
            Text("INVITE FRIENDS TO START WEEKLY COMPETITIONS.")
                .font(.system(size: TGTheme.fontBody, weight: TGTheme.fontWeightSemibold, design: .monospaced))
                .foregroundStyle(TGTheme.fg)
            TGButton("Invite friends", action: onInviteFriends)
        }
        .accessibilityElement(children: .contain)
    }

    private func contentBlock(_ data: TGCompetitionLoopData) -> some View {
        VStack(spacing: TGTheme.rowPadding) {
            TGStreakProofCard(
                streakDays: data.streakDays,
                sessionsCompleted: data.sessionsCompleted,
                screenTimeSavedMinutes: data.screenTimeSavedMinutes
            )

            TGFriendChallengeCard(
                title: data.challengeTitle,
                friendName: data.challengeFriend,
                periodLabel: data.challengePeriod,
                ctaTitle: "Start challenge",
                onTap: onStartChallenge
            )

            TGCard(title: "Leaderboard") {
                VStack(spacing: TGTheme.inlineGap) {
                    ForEach(data.entries) { entry in
                        TGLeaderboardRow(entry: entry)
                    }
                }
            }
        }
        .accessibilityElement(children: .contain)
    }
}
