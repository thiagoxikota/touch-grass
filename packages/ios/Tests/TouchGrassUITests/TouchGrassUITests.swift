import XCTest
@testable import TouchGrassUI

final class TouchGrassUITests: XCTestCase {
    func testClockFormatting() {
        XCTAssertEqual(TGFormat.clock(fromSeconds: 0), "00:00")
        XCTAssertEqual(TGFormat.clock(fromSeconds: 59), "00:59")
        XCTAssertEqual(TGFormat.clock(fromSeconds: 65), "01:05")
    }

    func testSignedMinutesFormatting() {
        XCTAssertEqual(TGFormat.signedMinutes(-12), "-12m")
        XCTAssertEqual(TGFormat.signedMinutes(0), "0m")
        XCTAssertEqual(TGFormat.signedMinutes(15), "+15m")
    }
}
