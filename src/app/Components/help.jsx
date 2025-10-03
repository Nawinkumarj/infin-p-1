"use client"
import React from 'react'

export default function Help() {
  return (
    <div className="help-section">
      <div className="help-container">
        
        {/* Header Section */}
        <div className="help-header">
          <div className="help-header-text">
            <div className="help-established">
              <span>EST</span>
              <span className="help-line"></span>
              <span>2025</span>
            </div>
            <div className="help-description">
              <p>
                we're excited to be by your side—bringing structure, momentum, and measurable results to every initiative we touch.
              </p>
              <p className="help-mission">
               Let’s shape complexity <br/> into clarity and <br/> ideas into outcomes.
              </p>
            </div>
          </div>
          
          <div className="help-main-title">
            <h1>WE'RE LOOKING FORWARD TO HELP YOU</h1>
            <div className="help-subtitle">
              <h2>BUILD YOUR DREAMS</h2>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="help-content">
          <div className="help-main-content">
            <div className="help-brand">
              <h2>Infinitas</h2>
              <span className="trademark">©</span>
            </div>
          </div>
          
          {/* Materials Preview */}
          <div className="help-materials">
            <div className="material-item sand">
              <div className="material-icon">⬢</div>
              <span></span>
            </div>
            <div className="material-item cement">
              <div className="material-icon">⬣</div>
              <span></span>
            </div>
            <div className="material-item bricks">
              <div className="material-icon">⬡</div>
              <span></span>
            </div>
            <div className="material-item blocks">
              <div className="material-icon">⬢</div>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
