import SwiftUI

public enum TGButtonVariant {
    case primary
    case secondary
    case danger
}

public struct TGButton: View {
    private let title: String
    private let variant: TGButtonVariant
    private let isDisabled: Bool
    private let isLoading: Bool
    private let action: () -> Void

    public init(
        _ title: String,
        variant: TGButtonVariant = .primary,
        isDisabled: Bool = false,
        isLoading: Bool = false,
        action: @escaping () -> Void
    ) {
        self.title = title
        self.variant = variant
        self.isDisabled = isDisabled
        self.isLoading = isLoading
        self.action = action
    }

    public var body: some View {
        let baseButton = Button(action: action) {
            Text(isLoading ? "█ ▓ ▒ ░" : title.uppercased())
                .font(.system(size: TGTheme.fontBody, weight: TGTheme.fontWeightSemibold, design: .monospaced))
                .lineLimit(1)
                .frame(maxWidth: .infinity, minHeight: TGTheme.minTapTarget)
                .padding(.horizontal, TGTheme.controlPaddingX)
        }
        .buttonStyle(.plain)
        .foregroundStyle(foreground)
        .background(background)
        .overlay(
            Rectangle()
                .strokeBorder(border, style: StrokeStyle(lineWidth: TGTheme.borderWidth, dash: isDisabled ? [6, 4] : []))
        )
        .disabled(isDisabled || isLoading)
        .accessibilityLabel(title)
        .accessibilityAddTraits(.isButton)

        if isLoading {
            baseButton.accessibilityValue("Loading")
        } else {
            baseButton
        }
    }

    private var foreground: Color {
        switch variant {
        case .primary: TGTheme.bg
        case .secondary, .danger: TGTheme.fg
        }
    }

    private var background: Color {
        switch variant {
        case .primary: TGTheme.earned
        case .secondary: TGTheme.bgAlt
        case .danger: TGTheme.danger
        }
    }

    private var border: Color {
        if isDisabled { return TGTheme.fgMuted }
        switch variant {
        case .primary: return TGTheme.earned
        case .secondary: return TGTheme.hairlineStrong
        case .danger: return TGTheme.danger
        }
    }
}

public struct TGCard<Content: View>: View {
    private let title: String?
    private let content: Content

    public init(title: String? = nil, @ViewBuilder content: () -> Content) {
        self.title = title
        self.content = content()
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: TGTheme.inlineGap) {
            if let title {
                Text(title.uppercased())
                    .font(.system(size: TGTheme.fontLabel, weight: TGTheme.fontWeightSemibold, design: .monospaced))
                    .foregroundStyle(TGTheme.fgMuted)
            }

            content
        }
        .padding(TGTheme.cardPadding)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(TGTheme.bgAlt)
        .overlay(Rectangle().stroke(TGTheme.hairline, lineWidth: TGTheme.borderWidth))
        .accessibilityElement(children: .contain)
    }
}

public enum TGBadgeVariant {
    case neutral
    case earned
    case danger
}

public struct TGBadge: View {
    private let title: String
    private let variant: TGBadgeVariant

    public init(_ title: String, variant: TGBadgeVariant = .neutral) {
        self.title = title
        self.variant = variant
    }

    public var body: some View {
        Text(title.uppercased())
            .font(.system(size: TGTheme.fontLabel, weight: TGTheme.fontWeightBold, design: .monospaced))
            .padding(.horizontal, TGTheme.inlineGap)
            .frame(minHeight: TGTheme.badgeMinHeight)
            .foregroundStyle(foreground)
            .background(background)
            .overlay(Rectangle().stroke(border, lineWidth: TGTheme.borderWidth))
            .accessibilityLabel(title)
    }

    private var foreground: Color {
        switch variant {
        case .neutral: TGTheme.fg
        case .earned: TGTheme.bg
        case .danger: TGTheme.fg
        }
    }

    private var background: Color {
        switch variant {
        case .neutral: TGTheme.bg
        case .earned: TGTheme.earned
        case .danger: TGTheme.danger
        }
    }

    private var border: Color {
        switch variant {
        case .neutral: TGTheme.hairlineStrong
        case .earned: TGTheme.earned
        case .danger: TGTheme.danger
        }
    }
}

public struct TGStat: View {
    private let label: String
    private let value: String
    private let deltaMinutes: Int?

    public init(label: String, value: String, deltaMinutes: Int? = nil) {
        self.label = label
        self.value = value
        self.deltaMinutes = deltaMinutes
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: TGTheme.inlineGap) {
            Text(label.uppercased())
                .font(.system(size: TGTheme.fontLabel, design: .monospaced))
                .foregroundStyle(TGTheme.fgSubtle)

            Text(value.uppercased())
                .font(.system(size: TGTheme.fontH3, weight: TGTheme.fontWeightBold, design: .monospaced))
                .foregroundStyle(TGTheme.fg)

            if let deltaMinutes {
                Text(TGFormat.signedMinutes(deltaMinutes))
                    .font(.system(size: TGTheme.fontLabel, weight: TGTheme.fontWeightSemibold, design: .monospaced))
                    .foregroundStyle(deltaMinutes <= 0 ? TGTheme.earned : TGTheme.danger)
            }
        }
        .padding(TGTheme.rowPadding)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(TGTheme.bg)
        .overlay(Rectangle().stroke(TGTheme.hairline, lineWidth: TGTheme.borderWidth))
        .accessibilityElement(children: .ignore)
        .accessibilityLabel(label)
        .accessibilityValue(deltaMinutes.map { "\(value), \(TGFormat.signedMinutes($0))" } ?? value)
    }
}

public struct TGTimer: View {
    private let totalSeconds: Int
    private let remainingSeconds: Int

    public init(totalSeconds: Int, remainingSeconds: Int) {
        self.totalSeconds = max(1, totalSeconds)
        self.remainingSeconds = max(0, remainingSeconds)
    }

    public var body: some View {
        VStack(alignment: .leading, spacing: TGTheme.inlineGap) {
            Text("FOCUS TIMER")
                .font(.system(size: TGTheme.fontLabel, weight: TGTheme.fontWeightSemibold, design: .monospaced))
                .foregroundStyle(TGTheme.fgMuted)

            Text(TGFormat.clock(fromSeconds: remainingSeconds))
                .font(.system(size: TGTheme.fontStatMd, weight: TGTheme.fontWeightBold, design: .monospaced))
                .minimumScaleFactor(0.5)
                .foregroundStyle(TGTheme.fg)

            GeometryReader { proxy in
                let progress = CGFloat(remainingSeconds) / CGFloat(totalSeconds)
                ZStack(alignment: .leading) {
                    Rectangle()
                        .fill(TGTheme.bg)
                    Rectangle()
                        .fill(TGTheme.earned)
                        .frame(width: proxy.size.width * progress)
                }
                .overlay(Rectangle().stroke(TGTheme.hairline, lineWidth: TGTheme.borderWidth))
            }
            .frame(height: TGTheme.rowPadding)
        }
        .padding(TGTheme.cardPadding)
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(TGTheme.bgAlt)
        .overlay(Rectangle().stroke(TGTheme.hairline, lineWidth: TGTheme.borderWidth))
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("Focus timer")
        .accessibilityValue("\(TGFormat.clock(fromSeconds: remainingSeconds)) remaining")
    }
}
