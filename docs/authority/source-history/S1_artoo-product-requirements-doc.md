# ARTOO Product Requirements Document

## Project Overview

ARTOO is an innovative AR-powered tattoo visualization and marketplace platform designed to revolutionize the tattoo industry. The platform connects artists, studios, and clients through advanced visualization technology, allowing users to see how tattoos will look on their bodies before committing to permanent ink. The platform includes a comprehensive marketplace for artists and studios, with features like commission management, POD temporary tattoos, educational content, and community features.

## Core Features and Functionality

### AR Visualization Technology (HIGHEST PRIORITY)

- **Static Image Visualization**: Overlay tattoos on uploaded photos with precise placement
- **Skin Contour Mapping**: Ensure tattoos precisely follow natural body curves and skin textures
- **Realistic Relighting**: Tattoo adapts to match lighting conditions in the original image
- **Angle Warping**: Tattoo perspective adjusts to match viewing angle for natural appearance
- **Live AR Visualization**: Real-time camera feed tattoo placement
- **Recorded Video AR**: Capture and save AR visualization sessions
- **Ink Representation**: Accurate rendering across all skin types and tones
- **Image Size Standardization**: Normalize tattoo designs regardless of source dimensions
- **Background Removal Solution**: Either automated processing or clear user guidance
- **Segmentation and Color Variation**: Allow users to modify design segments and colors
- **Capture/Save Functionality**: Save and export final designs once ideal placement is achieved
- **Avatar-based Visualization**: Place tattoos on digital body models
- **Multi-angle Visualization**: View designs from different perspectives
- **Skin Tone Adaptation**: Design adjusts to match various skin colors
- **Texture Simulation**: Show tattoos on different skin textures (scarred, stretch marks)
- **Seasonal Appearance Changes**: Visualization of summer tanning vs. winter paleness
- **Lighting Condition Simulation**: See tattoos under different lighting conditions
- **Dynamic Lighting Studio**: Test designs under various lighting situations
- **Size Comparison Tools**: Visualize scale against common objects
- **Pain Meter Visualization**: Heat-map overlay showing relative pain levels
- **Edge Handling**: Natural falloff at skin edges to prevent floating appearance
- **Body Movement Simulation**: View designs during muscle flex or skin stretch

### AI Tattoo Generation (HIGH PRIORITY)

- **Style-based Generation**: Create unique tattoo designs based on user preferences
- **Text-to-Tattoo**: Generate designs from textual descriptions
- **Style Transfer**: Apply artistic styles to basic design concepts
- **Custom Modifications**: Allow refinement of AI-generated designs
- **Artist-specific Training**: Learn and replicate specific artist styles (with permission)

### Progressive Avatar System

- **Parametric Avatars**: Adjustable body parameters (MVP)
- **Photogrammetric Models**: 3D scans of real body parts (Native)
- **MetaHuman Integration**: Ultra-realistic avatars for professional visualization (Advanced)
- **Universal Body Map**: Standardized UV mapping for consistent tattoo placement
- **Body Type Diversity**: Range of body shapes, sizes, and types for accurate visualization

### Advanced Visualization Features

- **Aging Simulation**: Projects how tattoos will appear over time as ink fades
- **Cover-up Visualization**: Tools for transforming existing tattoos into new designs
- **Ink Type Rendering**: Different ink styles and color technologies
- **Healing Process Preview**: Show healing stages from fresh to settled
- **Realistic Blending Modes**: Simulates how ink sits on skin with proper opacity
- **Color Customization Studio**: Advanced color picker with skin tone harmonization
- **Recovery Calculator**: Estimate healing time based on tattoo size, location, and complexity
- **Design Evolution Timeline**: Record iterations showing concept evolution

### User Interaction

- **Drag-and-Drop Placement**: Intuitive positioning on body canvas
- **Multi-touch Gestures**: Pinch-zoom, two-finger rotation, tap-to-place
- **Keyboard Shortcuts**: Arrow keys for fine adjustment, modifier keys for transformations
- **Mouse Controls**: Wheel scaling, shift-drag rotation, direct manipulation
- **Motion Controls**: Device positioning for 3D perspective
- **Voice Commands**: Hands-free adjustments (Native)
- **Voice-to-Design**: Describe tattoo ideas verbally for AI-generated concepts
- **AR Anchoring**: Lock designs to body position during movement
- **Real-time Adjustment**: Dynamic size, position, opacity controls

### User Management

- **Multiple Profiles**: Up to 3 profiles per account (different user types)
- **Public/Private Sharing**: Control over design visibility
- **Backup & Restore**: Design library preservation (Native only)
- **Design Organization**: Categorization and collection management
- **Import from Other Platforms**: Support for designs from Procreate, Adobe Fresco, etc.
- **Granular Permission System**: Control visibility of designs and profile elements
- **Tattoo Story Feature**: Documentation of meaning and story behind tattoos
- **Style Match Quiz**: Interactive questionnaire for tattoo style discovery
- **Skin Type Analysis**: Personalized recommendations based on skin characteristics

### ST/AT/UT Organizational Structure

- **Studio Tiers (ST Levels)**: Different studio membership levels affecting commission rates and visibility
- **Artist Tiers (AT Levels)**: Various artist classifications within studios with different privileges
- **User Tiers (UT Levels)**: Different membership levels for clients with varying access to features
- **Non-Compete Clauses**: Implementation between ST2 organizations
- **Cross-Studio Collaboration**: System for artists from different studios to work together
- **Organizational Hierarchy**: ST (studios) can establish rules for AT (artists)
- **Policy Customization**: Terms for commissions, revisions based on organization
- **Studio Virtual Tours**: 360° views of participating tattoo studios

### Marketplace Features

- **Design Browsing**: Searchable library with filtering options
- **Artist Profiles**: Detailed portfolios with past work, ratings, certifications
- **Custom Commissions**: Request system with negotiation capabilities
- **AI Recommendations**: Style-based suggestions based on user preferences
- **Wishlist Functionality**: Save designs for future consideration
- **Seasonal Design Recommendations**: Suggestions based on upcoming seasons/events
- **Limited Edition Drops**: Timed exclusive design releases from popular artists
- **Design Auction System**: Bid on one-of-a-kind tattoo designs
- **Custom Flash Sheet Creator**: Tools for artists to create and sell digital flash sheets

### Licensing & Rights Management

- **Design Ownership Rules**: Who retains rights to commissioned works
- **Usage Limitations**: How purchased designs can be used by clients
- **Commercial vs. Personal Licenses**: Different rights for business use
- **Artist Copyright Protection**: Measures against unauthorized copying
- **Watermarking Options**: Protect designs from unauthorized use
- **Rights Management**: Digital licensing and usage tracking

### POD Temporary Tattoos

- **Material Options**: Standard (1-3 days), Premium (3-7 days), Waterproof (5-10 days)
- **Size Calibration**: Tools to ensure accurate reproduction
- **Shipping Options**: Standard, Express, and International delivery
- **Differential Pricing**: Member discounts, bundle pricing
- **Artist Commissions**: Revenue sharing on POD sales
- **Gift Cards**: Purchase app credits or POD tattoos for friends

### Artist Tools

- **Scheduling System**: Calendar with manual and automated availability
- **Portfolio Management**: Showcase work with categorization
- **Commission Settings**: Customizable rates and terms
- **Export Package**: Multi-format export (PNG, PDF stencil, SVG) with coordinates
- **Rating System**: Feedback from clients (members only)
- **Deposit Requirement Options**: Studio-definable booking requirements
- **Cancellation Policy Management**: Custom no-show and late cancellation rules
- **Waitlist Functionality**: Automated filling of cancelled appointments
- **Consultation Booking**: Pre-design meeting scheduling
- **Timelapse Recording**: Document creation process for portfolio enhancement
- **Client Brief Templates**: Standardized formats for gathering design requirements
- **Health Screening Forms**: Digital integration of required health/consent forms
- **Anonymous Portfolio Reviews**: Unbiased feedback without revealing identity
- **Artist-User Collaborative Sketchbook**: Shared workspace for iterative design development between artists and clients

### Communication

- **Asynchronous Messaging** (MVP): Email-style communication
- **Real-time Chat** (Native): Instant messaging capabilities
- **Media Attachments**: Send designs and reference images
- **Message Templates**: Quick responses for common interactions
- **Response Indicators**: Shows typical artist response times
- **End-to-end Encryption** (Native): Secure messaging and design sharing
- **Aftercare Buddy System**: Connect users getting tattoos around the same time

### Payments Platform

- **Multi-directional Payment System**: Transactions between all parties (users, artists, shops, ARTOO)
- **Commission Splitting**: Automated revenue distribution between artists and studios
- **Variable Fee Structure**: Adjustable platform percentage based on membership tier
- **Escrow System**: Secure payment holding during commission process
- **Deposit Management**: Partial payments with milestone-based releases
- **Installment Plans**: Customizable payment schedules for larger pieces
- **Multiple Withdrawal Options**: Instant payout (fee) or standard bank transfer (3-5 days)
- **Tax Documentation**: Automated earnings reports for artists and studios
- **Currency Conversion**: Support for international transactions
- **Payment Method Diversity**: Credit/debit, PayPal, Venmo, CashApp, GPay, Revolut (MVP), with Stripe, Apple Pay, and Crypto (Native)
- **Loyalty Programs**: Rewards for returning clients with exclusive designs or discounts
- **Charity Flash Events**: Digital events where proceeds go to selected causes

### Business Model

- **Tiered Subscriptions**: Multiple membership levels with increasing benefits
- **User Tiers (UT)**:
  - Free Tier: Basic visualization with strict limitations
  - UT1: Enhanced features, parametric avatars, daily credits, discounts
  - UT2: Advanced avatar system, increased discounts, aging simulation, premium features
- **Artist Tiers (AT)**:
  - AT1: Marketplace selling, profile analytics, 75% sales commission, scheduling tools
  - AT2: 90% commission, featured placement, advanced export options, priority support
- **Studio Tiers (ST)**:
  - ST1: Studio management, bulk POD discounts, marketing tools, merchandise sales
  - ST2: Multi-location management, dedicated account management, advanced analytics, premium branding
- **Early Adoption Pricing**:
  - Free for first 100 users
  - 50% discount for next 1,000 users
  - Full pricing thereafter
- **Credit System**: Usage-based allocation that scales with tier level
- **One-time Purchases**: POD tattoos available without subscription
- **Member-Only Features**: Certain capabilities restricted to subscribers

### Partnerships & Promotions

- **Studio Partnerships**: Integration with existing tattoo studios for cross-promotion
- **Artist Promotion System**: Feature prominent artists with revenue sharing
- **Brand Alliances**: Collaboration with aligned brands in fashion, beauty, and art sectors
- **Promotional Tools**: Technical capabilities to highlight partners within the platform
- **Sponsorship Infrastructure**: Support for sponsored content and featured placement

### Educational Content

- **Tattoo History**: Cultural and historical context for styles
- **Interactive World Map**: Regional style exploration
- **Style Discovery**: Browse different techniques and approaches
- **AI Style Matcher**: Upload images to find similar designs (Native only)
- **Artist-Style Connections**: Find creators specializing in specific styles
- **Expert Contributors**: Industry professionals providing educational material
- **Certification Programs**: Educational tracks for artists to gain credentials
- **Live Webinar Integration**: Real-time educational events
- **Community Knowledge Base**: User-contributed tips and techniques
- **Ink Events Calendar**: Listing of tattoo conventions, guest artist appearances, and flash events

### E-commerce Features

- **Shopping Cart**: Support for multiple design purchases
- **AR Preview**: Visualize designs before checkout
- **Auto-save Cart**: 48-hour retention (Native only)
- **Discount System**: Promotional codes and bundle pricing
- **Gift Options**: Send designs to others

### Order Management

- **Commission Tracking**: Status updates on custom work
- **Completion Estimates**: Timeframe projections
- **Revision System**: Request changes based on artist policies
- **Refund Policies**: Cancellation terms per ST/AT rules
- **Messaging Integration**: Communication tied to specific orders

### Community Features

- **Forums and Discussion Boards**: User-to-user information sharing
- **Design Feedback System**: Community input on works-in-progress
- **Artist Mentorship Programs**: Established artists guiding newcomers
- **Contest/Challenge System**: Regular design competitions
- **Apprenticeship Marketplace**: Platform for connecting aspiring artists with mentors

### Tattoo Recognition & Analysis

- **Style Identification**: Analyze existing tattoos to identify styles
- **Artist Recognition**: Find artists based on style similarities
- **Tattoo Recognition**: Upload photos of existing tattoos to find similar styles or artists
- **Cover-up Potential Analysis**: Assess existing tattoos for cover-up options

### Extras Features

- **Plugin Architecture**: Support for third-party design tools
- **API Integration**: Connection with external booking systems
- **Custom Script Support**: Artist-defined visualization rules
- **Style Pack System**: Downloadable specialized art styles
- **Custom UI Themes**: Personalized interface appearance (Native)
- **Language Localization Framework**: Extensible translation system
- **Analytics Integration**: Performance tracking for artists and studios
- **Social Platform Connectors**: Share designs across networks
- **Calendar Synchronization**: Connect with external scheduling tools
- **CRM Integration**: Connect with studio management software

### Extended Reality & Visualization

- **Projection Mapping Tool**: For artists to project designs directly onto clients' skin during consultations
- **Motion Visualization**: Show how tattoos look during specific movements (dancing, sports, etc.)
- **Scarification Preview**: Visualize how designs would appear as scarification instead of ink
- **White Ink Simulator**: Specialized visualization for white ink tattoos on different skin tones
- **Time-of-Day Simulation**: View how tattoos will appear in morning light vs. evening light
- **Environment-Based Preview**: See tattoos in different contexts (beach, office, formal event)

### Social & Community

- **Artist Residency Program**: Featured artists get platform promotion for limited periods
- **Tattoo Tinder**: Swipe-based design discovery that learns preferences over time
- **Geographic Heat Map**: Visual representation of popular styles by region
- **Tattoo Tourism Guide**: Resources for traveling to get work from specific artists
- **Design Crowdsourcing**: Submit design briefs for multiple artists to propose concepts
- **Memory Vault**: Private space for users to document meanings behind personal tattoos
- **Genealogy of Style**: Interactive maps showing artistic influence connections between artists

### Client Experience

- **Sonic Design Experience**: Music pairings that complement tattoo styles during visualization
- **AR Studio Mirror**: Use tablet/smart mirror in studio for real-time client consultation
- **Session Endurance Tools**: Timers and tracking for long session planning
- **Accessibility Features**: Tools for users with disabilities to better communicate design needs
- **Cultural Sensitivity Checker**: Flag designs that might be inappropriate cultural appropriation
- **Tattoo Translator**: Tool to ensure accuracy of text in different languages
- **Mood Board Generator**: AI-assisted creation of aesthetic references

### Artist Tools

- **Real-time Collaborative Design**: Multiple artists can work on a design simultaneously
- **Voice-to-Adjustment**: Make design changes via voice commands during tattooing
- **Client History Timeline**: Visual record of each client's journey with the artist
- **Material Calculator**: Estimate ink and supply needs based on design specifications
- **Style Evolution Analysis**: Track how an artist's style develops over time
- **Earnings Forecaster**: Project income based on booked appointments
- **Assistant AI**: Helps with administrative tasks and client communications

### Business Innovations

- **Collective Funding**: Users pool resources for artist travel/guest spots
- **Micro-commissions**: Affordable 15-minute design consultations
- **NFT Integration**: Digital certificates of authenticity for custom designs
- **Heritage Preservation**: Program for documenting and preserving traditional tattooing techniques
- **Archive Service**: Long-term storage of tattoo designs for future generations
- **Design Subscription**: Monthly access to exclusive artist flash
- **Carbon Offset Integration**: Calculate and offset environmental impact of tattoo supplies

### Technical Advancements

- **Haptic Feedback**: Feel simulated tattooing sensation on mobile devices
- **Dermatological Consultation**: AI-assisted skin analysis for optimal healing predictions
- **Ink Chemistry Education**: Information about how different pigments interact with skin
- **Interactive Tattoo Tech**: Preview how tattoos might integrate with emerging "smart tattoo" technology
- **Medical Alert Features**: Tools for designing medically necessary tattoos (allergies, conditions)
- **Scent-based Experience**: Pair visualization with realistic studio scents via app-controlled diffuser

### Privacy & Security

- **GDPR Compliance**: Comprehensive data protection measures
- **Identity Verification**: Artist and studio validation process

## User Experience Requirements

- The platform must be intuitive and accessible to users with varying levels of technical expertise
- AR visualization must be realistic enough to provide accurate representation of how tattoos will appear
- Loading times for visualization should be under 3 seconds
- The platform should be accessible across multiple devices with consistent experience
- User journeys should be streamlined with minimal steps to complete core actions
- Accessibility features must accommodate diverse needs across all skin types and tones

## Business Requirements & Success Metrics

### Primary Business Goals

- Create a self-funding improvement cycle to rapidly generate revenue for ongoing development
- Achieve viral growth similar to Lensa AI's benchmark success (19.3M downloads, $30.7M revenue in December 2022)
- Establish ARTOO as the go-to platform for tattoo visualization and artist-client connections
- Build a scalable business model that balances freemium features with premium revenue streams

### Revenue Strategy

- Implement the multi-tier subscription model (UT/AT/ST) with compelling value at each level
- Develop a credit-based system for AR visualizations to drive conversions
- Create multiple revenue streams: subscriptions, one-time credits, POD temporary tattoos, artist commissions
- Design pricing strategy to maximize both user acquisition and initial revenue
- Provide clear business value to justify premium pricing for ST2 and AT2 tiers
- Implement strategic early adoption pricing: free for first 100 users, 50% off for next 1,000

### Partnership Strategy

- Develop technical integration for cross-promotion with tattoo studios
- Create systems for featuring prominent artists with revenue sharing arrangements
- Build infrastructure for brand partnerships and sponsored content
- Design promotional tools that highlight partners while maintaining user experience

### Growth Targets

- Phase 1 (Launch): 100,000+ downloads within first month, 5% conversion to paid features
- Phase 2 (Growth): 1M+ downloads within 3 months, viral coefficient > 1.2
- Phase 3 (Expansion): 10M+ downloads within 6 months, expansion to additional revenue streams
- Long-term: Establish network effects between users, artists, and studios to create defensible market position

### Lensa AI Success Model (Case Study Directive)

The AI development workflow must analyze Lensa AI's explosive growth as a detailed case study and pattern for ARTOO's development strategy. Specifically:

- Analyze Lensa's product development timeline from 2018 launch to 2022 viral success
- Identify the specific technical and UX features that triggered viral adoption in Q4 2022
- Decompose Lensa's marketing strategy, user acquisition channels, and viral mechanics
- Map Lensa's pricing model and how it optimized for both acquisition and revenue
- Extract applicable patterns from Lensa's AI implementation that can be applied to AR visualization
- Research optimal pricing strategies based on Lensa's model, adjusted for ARTOO's market
- Create a detailed implementation roadmap that mirrors Lensa's critical success factors

## Technical Requirements

```json
{
  "architecture": {
    "preferred_approach": "Hybrid microservices with specialized components",
    "client": {
      "primary": "Progressive Web App",
      "secondary": ["iOS native app", "Android native app"]
    },
    "server": {
      "api_gateway": "API Gateway / Backend for Frontend (BFF) Layer",
      "services": {
        "user_service": {
          "technology": ".NET Core",
          "purpose": "Identity, profiles, preferences"
        },
        "payment_service": {
          "technology": "Node.js",
          "purpose": "Transactions, commissions, escrow"
        },
        "design_service": {
          "technology": "Node.js",
          "purpose": "Tattoo catalog, versioning, licensing"
        },
        "artist_service": {
          "technology": ".NET Core",
          "purpose": "Portfolios, scheduling, ratings"
        },
        "communication_service": {
          "technology": "Node.js",
          "purpose": "Messaging, notifications"
        },
        "analytics_service": {
          "technology": "Python",
          "purpose": "User behavior, business intelligence"
        }
      },
      "specialized_components": {
        "ar_visualization_engine": {
          "technology": "Rust/WebAssembly",
          "purpose": "High-performance rendering"
        },
        "search_service": {
          "technology": "Elasticsearch",
          "purpose": "Advanced catalog discovery"
        },
        "recommendation_engine": {
          "technology": "Python",
          "purpose": "AI-powered suggestions"
        },
        "serverless_functions": {
          "technology": "Cloud Functions",
          "purpose": "Event processing, integrations, webhooks"
        }
      }
    },
    "data_services": {
      "relational_database": {
        "technology": "PostgreSQL",
        "purpose": "Transactional data"
      },
      "document_store": {
        "technology": "MongoDB",
        "purpose": "Design metadata"
      },
      "object_storage": {
        "technology": "Google Cloud Storage",
        "purpose": "Design assets storage",
        "preference": "Avoid AWS S3"
      },
      "cache_layer": {
        "technology": "Redis",
        "purpose": "Performance optimization"
      },
      "event_streaming": {
        "technology": "Kafka",
        "purpose": "System integration"
      }
    },
    "infrastructure": {
      "cloud_provider": "GCP",
      "alternative": "Vercel for frontend",
      "containerization": "Docker",
      "orchestration": "Kubernetes",
      "iac_preference": "Alternatives to Terraform preferred"
    }
  },
  "development_constraints": {
    "budget": 60,
    "focus": "Balance ease of implementation with extensibility capabilities",
    "priority": "Self-funding improvement cycle"
  },
  "team_composition": {
    "frontend": ["React", "Swift", "Kotlin"],
    "backend": [".NET Core", "Node.js", "Python"],
    "specialized": ["AR/WebAssembly", "DevOps/SRE", "Database", "Security"]
  }
}
```