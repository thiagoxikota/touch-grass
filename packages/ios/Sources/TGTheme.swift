import Foundation
import SwiftUI
import TouchGrassTokens

public enum TGTheme {
    public static let minTapTarget: CGFloat = TouchGrassTokens.space12
    public static let borderWidth: CGFloat = TouchGrassTokens.borderHairlineWidth
    public static let strongBorderWidth: CGFloat = TouchGrassTokens.borderStrongWidth
    public static let cardPadding: CGFloat = TouchGrassTokens.space4
    public static let rowPadding: CGFloat = TouchGrassTokens.space3
    public static let inlineGap: CGFloat = TouchGrassTokens.space2
    public static let space1: CGFloat = TouchGrassTokens.space1
    public static let sectionGap: CGFloat = TouchGrassTokens.space4
    public static let controlPaddingX: CGFloat = TouchGrassTokens.space3
    public static let badgeMinHeight: CGFloat = TouchGrassTokens.space6
    public static let rowRankWidth: CGFloat = TouchGrassTokens.space12
    public static let skeletonRowHeight: CGFloat = TouchGrassTokens.space16

    public static let fontBody: CGFloat = TouchGrassTokens.fontSizeBody
    public static let fontLabel: CGFloat = TouchGrassTokens.fontSizeLabel
    public static let fontRowName: CGFloat = TouchGrassTokens.fontSizeRowName
    public static let fontRowNum: CGFloat = TouchGrassTokens.fontSizeRowNum
    public static let fontH3: CGFloat = TouchGrassTokens.fontSizeH3
    public static let fontH2: CGFloat = TouchGrassTokens.fontSizeH2
    public static let fontStatMd: CGFloat = TouchGrassTokens.fontSizeStatMd
    public static let fontWeightSemibold: Font.Weight = .semibold
    public static let fontWeightBold: Font.Weight = .bold

    public static var bg: Color { platformColor(TouchGrassTokens.colorBg) }
    public static var bgAlt: Color { platformColor(TouchGrassTokens.colorBgAlt) }
    public static var fg: Color { platformColor(TouchGrassTokens.colorFg) }
    public static var fgMuted: Color { platformColor(TouchGrassTokens.colorFgMuted) }
    public static var fgSubtle: Color { platformColor(TouchGrassTokens.colorFgSubtle) }
    public static var earned: Color { platformColor(TouchGrassTokens.colorEarned) }
    public static var danger: Color { platformColor(TouchGrassTokens.colorDanger) }
    public static var hairline: Color { platformColor(TouchGrassTokens.colorHairline) }
    public static var hairlineStrong: Color { platformColor(TouchGrassTokens.colorHairlineStrong) }

    private static func platformColor(_ color: TouchGrassColor) -> Color {
        #if os(macOS)
        return Color(nsColor: color)
        #else
        return Color(uiColor: color)
        #endif
    }
}

public enum TGFormat {
    public static func clock(fromSeconds seconds: Int) -> String {
        let clamped = max(0, seconds)
        let minutes = clamped / 60
        let remainder = clamped % 60
        return String(format: "%02d:%02d", minutes, remainder)
    }

    public static func signedMinutes(_ minutes: Int) -> String {
        let sign = minutes > 0 ? "+" : ""
        return "\(sign)\(minutes)m"
    }

    public static func leaderboardAccessibility(entry: TGLeaderboardEntry) -> String {
        let rankPrefix = entry.tiedAtRank ? "Tied rank \(entry.rank)" : "Rank \(entry.rank)"
        let owner = entry.isCurrentUser ? "you" : entry.displayName
        return "\(rankPrefix), \(owner), \(entry.focusMinutes) minutes focused, \(signedMinutes(entry.deltaMinutes)) this week, \(entry.streakDays) day streak"
    }
}
