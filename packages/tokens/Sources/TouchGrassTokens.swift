
//
// TouchGrassTokens.swift
//

// Do not edit directly, this file was auto-generated.


import Foundation
import CoreGraphics
#if canImport(UIKit)
import UIKit
public typealias TouchGrassColor = UIColor
#elseif canImport(AppKit)
import AppKit
public typealias TouchGrassColor = NSColor
#else
#error("Unsupported Apple platform: expected UIKit or AppKit")
#endif

public class TouchGrassTokens {
    public static let borderActiveColor = color(0.651, 1.000, 0.000, 1)
    public static let borderActiveStyle = "solid"
    public static let borderActiveWidth = CGFloat(2.00)
    public static let borderDangerColor = color(1.000, 0.420, 0.420, 1)
    public static let borderDangerStyle = "solid"
    public static let borderDangerWidth = CGFloat(2.00)
    public static let borderDisabledColor = color(1.000, 1.000, 1.000, 1)
    public static let borderDisabledStyle = "dashed"
    public static let borderDisabledWidth = CGFloat(2.00)
    public static let borderHairlineColor = color(0.102, 0.102, 0.102, 1)
    public static let borderHairlineStyle = "solid"
    public static let borderHairlineWidth = CGFloat(1.00)
    public static let borderStrongColor = color(1.000, 1.000, 1.000, 1)
    public static let borderStrongStyle = "solid"
    public static let borderStrongWidth = CGFloat(2.00)
    public static let breakpointDesktop = CGFloat(1024.00)
    public static let breakpointMobile = CGFloat(0.00)
    public static let breakpointTablet = CGFloat(768.00)
    public static let colorBg = color(0.000, 0.000, 0.000, 1) /** Background. Pure black. */
    public static let colorBgAlt = color(0.039, 0.039, 0.039, 1) /** Inset surface. Never text. */
    public static let colorDanger = color(1.000, 0.420, 0.420, 1) /** Danger/loss. WCAG AAA on black. */
    public static let colorEarned = color(0.651, 1.000, 0.000, 1) /** Earned/success/active + Touch Grass brand mark. Bloomberg lime. Products may consolidate own brand into this token (see brand/timeouts/doctrine.md §Brand color). */
    public static let colorFg = color(1.000, 1.000, 1.000, 1) /** Primary text. Body copy + headings. */
    public static let colorFgMuted = color(0.702, 0.702, 0.702, 1) /** Secondary text. Labels, helper text, metadata. >7:1 on black. */
    public static let colorFgSubtle = color(0.502, 0.502, 0.502, 1) /** Tertiary text. Timestamps, placeholders, table headers. >4.5:1 on black. Metadata/labels only — never body copy. */
    public static let colorHairline = color(0.102, 0.102, 0.102, 1) /** Border, divider. Default weight. */
    public static let colorHairlineStrong = color(0.200, 0.200, 0.200, 1) /** Emphasis border. Focus ring pairing, selected states. */
    public static let colorMuted = color(0.702, 0.702, 0.702, 1) /** Secondary/Muted text. >7:1 on black. */
    public static let colorSubtle = color(0.502, 0.502, 0.502, 1) /** Tertiary text. Metadata/labels only. >4.5:1 on black. */
    public static let fontFamilyMono = "'Geist Mono', ui-monospace, 'SF Mono', monospace"
    public static let fontFamilySans = "Geist, ui-sans-serif, system-ui, sans-serif"
    public static let fontSizeBody = CGFloat(16.00) /** Body floor */
    public static let fontSizeDisplay = CGFloat(56.00)
    public static let fontSizeH1 = CGFloat(32.00)
    public static let fontSizeH2 = CGFloat(24.00)
    public static let fontSizeH3 = CGFloat(18.00)
    public static let fontSizeLabel = CGFloat(13.00) /** Label floor (mono, uppercase) */
    public static let fontSizeRowName = CGFloat(18.00)
    public static let fontSizeRowNum = CGFloat(22.00)
    public static let fontSizeStatLg = CGFloat(80.00) /** Default stat hero with seconds */
    public static let fontSizeStatMd = CGFloat(64.00) /** Mobile stat hero */
    public static let fontSizeStatXl = CGFloat(96.00) /** Reserved for full-bleed hero only */
    public static let fontTrackingNormal = 0.000
    public static let fontTrackingTight = -0.040
    public static let fontTrackingWide = 0.120 /** All uppercase labels */
    public static let fontWeight600 = 600
    public static let fontWeight700 = 700
    public static let fontWeight800 = 800
    public static let fontWeight900 = 900
    public static let motionDurationInstant = 0.00 /** The only duration. There is no other. */
    public static let motionEasingNone = "linear"
    public static let radiusNone = CGFloat(0.00) /** Only radius. Never changes. */
    public static let space0 = CGFloat(0.00)
    public static let space1 = CGFloat(4.00)
    public static let space12 = CGFloat(48.00)
    public static let space16 = CGFloat(64.00)
    public static let space2 = CGFloat(8.00)
    public static let space24 = CGFloat(96.00)
    public static let space3 = CGFloat(12.00)
    public static let space32 = CGFloat(128.00)
    public static let space4 = CGFloat(16.00)
    public static let space5 = CGFloat(20.00)
    public static let space6 = CGFloat(24.00)
    public static let space8 = CGFloat(32.00)

    private static func color(_ r: CGFloat, _ g: CGFloat, _ b: CGFloat, _ a: CGFloat) -> TouchGrassColor {
        #if canImport(UIKit)
        return UIColor(red: r, green: g, blue: b, alpha: a)
        #else
        return NSColor(calibratedRed: r, green: g, blue: b, alpha: a)
        #endif
    }
}