export default function HeroFooter({ isInside }) {
  return (
    <footer className="hero-footer">
      {/* Left Status Indicator */}
      <div className="footer-left-status">
        <span className="status-indicator-light"></span>
        <span>{isInside ? 'INTERIOR VIEW • 3D ENVIRONMENT' : 'MAIN ENTRANCE • 3D ENVIRONMENT'}</span>
      </div>

      {/* Center Explore Cursor Instruction */}
      <div className="footer-center-explore">
        <div className="mouse-indicator-icon">
          <span className="mouse-wheel-dot"></span>
        </div>
        <span>MOVE YOUR CURSOR TO EXPLORE</span>
      </div>

      {/* Right Scroll Instruction */}
      <div className="footer-right-scroll">
        <span>SCROLL TO EXPLORE</span>
        <div className="scroll-arrow-icon">
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </footer>
  );
}
