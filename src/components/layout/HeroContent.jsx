export default function HeroContent({ isInside, onEnterOffice, onExitOffice }) {
  return (
    <>
      {/* Outside View Hero Content */}
      <div className={`hero-content ${isInside ? 'fade-out' : ''}`}>
        <h1 className="hero-title">
          <span className="title-line">STEP INSIDE.</span>
          <span className="title-line">
            BUILD WHAT'S <span className="highlight-gold">NEXT.</span>
          </span>
        </h1>

        <p className="hero-description">
          Digital experiences, intelligent software, and ideas built to move businesses forward.
        </p>

        <button
          type="button"
          className="cta-button"
          onClick={onEnterOffice}
          aria-label="Enter our office"
        >
          <span>ENTER OUR OFFICE</span>
          <span className="arrow-icon">→</span>
        </button>
      </div>

      {/* Inside View State UI */}
      {isInside && (
        <div className="inside-controls">
          <div className="inside-badge">
            <span className="inside-badge-dot"></span>
            <span>HEADQUARTERS LOBBY</span>
          </div>

          <h2 className="inside-title">
            WELCOME TO <br />
            GRACEWELL
          </h2>

          <p className="inside-desc">
            You are now inside the main innovation floor. Move your cursor to look around the space.
          </p>

          <button
            type="button"
            className="return-button"
            onClick={onExitOffice}
            aria-label="Return to entrance"
          >
            <span>←</span>
            <span>RETURN TO ENTRANCE</span>
          </button>
        </div>
      )}
    </>
  );
}
