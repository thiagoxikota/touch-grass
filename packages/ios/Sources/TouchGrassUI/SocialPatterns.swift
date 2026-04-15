import SwiftUI

public struct TGLeaderboardEntry: Identifiable, Equatable {
    public let id: String
    public let rank: Int
    public let displayName: String
    public let focusMinutes: Int
    public let deltaMinutes: Int
    public let streakDays: Int
    public let isCurrentUser: Bool
    public let tiedAtRank: Bool

    public init(
        id: String,
        rank: Int,
        displayName: String,
        focusMinutes: Int,
        deltaMinutes: Int,
        streakDays: Int,
        isCurrentUser: Bool = false,
        tiedAtRank: Bool = false
    ) {
        self.id = id
        self.rank = rank
        self.displayName = displayName
        self.focusMinutes = focusMinutes
        self.deltaMinutes = deltaMinutes
        self.streakDays = streakDays
        self.isCurrentUser = isCurrentUser
        self.tiedAtRank = tiedAtRank
    }
}

public extension TGLeaderboardEntry {
    var semanticSnapshot: String {
        "rank=\(rank);tie=\(tiedAtRank);user=\(isCurrentUser);name=\(displayName);focus=\(focusMinutes);delta=\(deltaMinutes);streak=\(streakDays)"
    }
}

public struct TGLeaderboardRow: View {
    private let entry: TGLeaderboardEntry

    public init(entry: TGLeaderboardEntry) {
        self.entry = entry
    }

    public var body: some View {
        HStack(spacing: TGTheme.rowPadding) {
            Text(entry.tiedAtRank ? "T\(entry.rank)" : "#\(entry.rank)")
                .font(.system(size: TGTheme.fontRowNum, weight: TGTheme.fontWeightBold, design: .monospaced))
                .foregroundStyle(TGTheme.fgMuted)
                .frame(width: TGTheme.rowRankWidth, alignment: .leading)

            VStack(alignment: .leading, spacing: TGTheme.space1) {
                Text(entry.displayName.uppercased())
                    .font(.system(size: TGTheme.fontRowName, weight: TGTheme.fontWeightSemibold, design: .monospaced))
                    .foregroundStyle(TGTheme.fg)

                Text("\(entry.streakDays) DAY STREAK")
                    .font(.system(size: TGTheme.fontLabel, design: .monospaced))
                    .foregroundStyle(TGTheme.fgSubtle)
            }

            Spacer(minLength: TGTheme.inlineGap)

            VStack(alignment: .trailing, spacing: TGTheme.space1) {
                Text("\(entry.focusMinutes)M")
                    .font(.system(size: TGTheme.fontBody, weight: TGTheme.fontWeightBold, design: .monospaced))
                    .foregroundStyle(TGTheme.fg)

                Text(TGFormat.signedMinutes(entry.deltaMinutes))
                    .font(.system(size: TGTheme.fontLabel, weight: TGTheme.fontWeightSemibold, design: .monospaced))
                    .foregroundStyle(entry.deltaMinutes <= 0 ? TGTheme.earned : TGTheme.danger)
            }
        }
        .padding(TGTheme.rowPadding)
        .frame(maxWidth: .infinity)
        .background(entry.isCurrentUser ? TGTheme.bgAlt : TGTheme.bg)
        .overlay(Rectangle().stroke(entry.isCurrentUser ? TGTheme.earned : TGTheme.hairline, lineWidth: TGTheme.borderWidth))
        .accessibilityElement(children: .ignore)
        .accessibilityLabel(TGFormat.leaderboardAccessibility(entry: entry))
    }
}

public struct TGFriendChallengeCard: View {
    private let title: String
    private let friendName: String
    private let periodLabel: String
    private let ctaTitle: String
    private let onTap: () -> Void

    public init(
        title: String,
        friendName: String,
        periodLabel: String,
        ctaTitle: String = "Challenge",
        onTap: @escaping () -> Void
    ) {
        self.title = title
        self.friendName = friendName
        self.periodLabel = periodLabel
        self.ctaTitle = ctaTitle
        self.onTap = onTap
    }

    public var body: some View {
        TGCard(title: "Challenge") {
            VStack(alignment: .leading, spacing: TGTheme.rowPadding) {
                Text(title.uppercased())
                    .font(.system(size: TGTheme.fontH3, weight: TGTheme.fontWeightBold, design: .monospaced))
                    .foregroundStyle(TGTheme.fg)

                Text("VS \(friendName.uppercased()) · \(periodLabel.uppercased())")
                    .font(.system(size: TGTheme.fontLabel, design: .monospaced))
                    .foregroundStyle(TGTheme.fgMuted)

                TGButton(ctaTitle, action: onTap)
            }
        }
        .accessibilityElement(children: .contain)
    }
}

public struct TGWeeklyRankChange: View {
    private let currentRank: Int
    private let previousRank: Int
    private let periodLabel: String

    public init(currentRank: Int, previousRank: Int, periodLabel: String = "This week") {
        self.currentRank = currentRank
        self.previousRank = previousRank
        self.periodLabel = periodLabel
    }

    public var body: some View {
        TGCard(title: periodLabel) {
            HStack {
                VStack(alignment: .leading, spacing: TGTheme.inlineGap) {
                    Text("RANK")
                        .font(.system(size: TGTheme.fontLabel, design: .monospaced))
                        .foregroundStyle(TGTheme.fgSubtle)
                    Text("#\(currentRank)")
                        .font(.system(size: TGTheme.fontH2, weight: TGTheme.fontWeightBold, design: .monospaced))
                        .foregroundStyle(TGTheme.fg)
                }

                Spacer()

                TGBadge(changeLabel, variant: changeVariant)
            }
        }
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("Weekly rank")
        .accessibilityValue("Current rank \(currentRank). \(changeLabel.lowercased())")
    }

    private var change: Int { previousRank - currentRank }

    private var changeLabel: String {
        if change > 0 { return "UP \(change)" }
        if change < 0 { return "DOWN \(abs(change))" }
        return "NO CHANGE"
    }

    private var changeVariant: TGBadgeVariant {
        if change > 0 { return .earned }
        if change < 0 { return .danger }
        return .neutral
    }
}

public struct TGStreakProofCard: View {
    private let streakDays: Int
    private let sessionsCompleted: Int
    private let screenTimeSavedMinutes: Int

    public init(streakDays: Int, sessionsCompleted: Int, screenTimeSavedMinutes: Int) {
        self.streakDays = streakDays
        self.sessionsCompleted = sessionsCompleted
        self.screenTimeSavedMinutes = screenTimeSavedMinutes
    }

    public var body: some View {
        TGCard(title: "Social proof") {
            HStack(spacing: TGTheme.inlineGap) {
                TGBadge("\(streakDays) DAY STREAK", variant: .earned)
                TGBadge("\(sessionsCompleted) SESSIONS")
            }

            Text("\(screenTimeSavedMinutes) MIN OFF SCREEN THIS WEEK")
                .font(.system(size: TGTheme.fontH3, weight: TGTheme.fontWeightBold, design: .monospaced))
                .foregroundStyle(TGTheme.fg)
        }
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("Social proof")
        .accessibilityValue("\(streakDays) day streak, \(sessionsCompleted) sessions, \(screenTimeSavedMinutes) minutes off screen this week")
    }
}
