import { useState, useEffect, useRef } from 'react'
import './App.css'

 
const backgroundImages = [
  './image/home1.webp',
  './image/home2.webp',
  './image/home3.webp',
  './image/home4.webp',
  './image/home5.webp'
]

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [cardImages, setCardImages] = useState([
    { id: 1, image: './image/home1.webp', imageIndex: 0 },
    { id: 2, image: './image/home2.webp', imageIndex: 1 }
  ])

  // Ref to the top card (stack-image-1) to compute transform-origin
  const topCardRef = useRef(null)
  const transformOriginRef = useRef('80% 50%')

  const computeTransformOriginFromTopCard = () => {
    try {
      if (topCardRef.current) {
        const rect = topCardRef.current.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const xPercent = (cx / window.innerWidth) * 100
        const yPercent = (cy / window.innerHeight) * 100
        transformOriginRef.current = `${xPercent}% ${yPercent}%`
      } else {
        transformOriginRef.current = '80% 50%'
      }
    } catch (e) {
      transformOriginRef.current = '80% 50%'
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      // Compute transform-origin from the top card before switching
      computeTransformOriginFromTopCard()
      setCurrentImageIndex((prev) => {
        const nextIndex = (prev + 1) % backgroundImages.length
        
        // Update card images to cycle through all images
        setCardImages(prevCards => [
          { 
            id: prevCards[0].id, 
            image: backgroundImages[(nextIndex + 1) % backgroundImages.length], 
            imageIndex: (nextIndex + 1) % backgroundImages.length 
          },
          { 
            id: prevCards[1].id, 
            image: backgroundImages[(nextIndex + 2) % backgroundImages.length], 
            imageIndex: (nextIndex + 2) % backgroundImages.length 
          }
        ])
        
        return nextIndex
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  // Recompute on mount and when window resizes
  useEffect(() => {
    computeTransformOriginFromTopCard()
    const onResize = () => computeTransformOriginFromTopCard()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleFormSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted')
  }

  return (
    <div className="app">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <img src="/logo/navLogo.webp" alt="Agasa Logo" className="logo-image" />
          </div>
          
          <ul className="nav-menu">
            <li className="nav-item">
              <a href="#home" className="nav-link active">Home</a>
            </li>
            <li className="nav-item">
              <a href="#services" className="nav-link">Services</a>
            </li>
            <li className="nav-item">
              <a href="#projects" className="nav-link">Projects</a>
            </li>
            <li className="nav-item">
              <a href="#why-agasa" className="nav-link">Why Agasa</a>
            </li>
            <li className="nav-item">
              <a href="#events" className="nav-link">Events</a>
            </li>
            <li className="nav-item">
              <a href="#blogs" className="nav-link">Blogs</a>
            </li>
            <li className="nav-item">
              <a href="#contact" className="nav-link">Contact Us</a>
            </li>
          </ul>
          
          <button className="book-consulting-btn">
            Book Free Consulting
          </button>
        </div>
      </nav>

      {/* Background Images */}
      <div className="background-container">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`background-image ${index === currentImageIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})`, transformOrigin: transformOriginRef.current }}
          />
        ))}
        <div className="background-overlay" />
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-left">
          <div className="hero-text">
            <h1>Residential Services</h1>
            <p className="subtitle">Built for Generations to Come</p>
          </div>

          <form className="contact-form" onSubmit={handleFormSubmit}>
            <div className="form-row">
              <input type="text" placeholder="Name" className="form-input" />
              <input type="tel" placeholder="Phone number" className="form-input" />
              <input type="email" placeholder="Email" className="form-input" />
              <input type="text" placeholder="Location of your plot" className="form-input" />
            </div>
            <div className="form-row">
              <input type="text" placeholder="Size of plot" className="form-input" />
              <select className="form-input">
                <option>Estimated Project Budget</option>
                <option>$50,000 - $100,000</option>
                <option>$100,000 - $250,000</option>
                <option>$250,000 - $500,000</option>
                <option>$500,000+</option>
              </select>
              <button type="submit" className="contact-btn">Contact Us</button>
            </div>
            <div className="form-actions">
              <div className="recaptcha">
                <input type="checkbox" id="recaptcha" />
                <label htmlFor="recaptcha">I'm not a robot</label>
              </div>
            </div>
          </form>
        </div>

        <div className="content-right">
          <div className="image-stack">
            {cardImages.map((card, index) => (
            <div
              key={card.id}
              ref={index === 0 ? topCardRef : null}
              className={`stack-image stack-image-${index + 1} ${index === currentImageIndex ? 'active' : ''}`}
              style={{ 
                backgroundImage: `url(${card.image})`,
                zIndex: cardImages.length - index
              }}
            />
          ))}
        </div>
      </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        className="nav-arrow nav-arrow-left"
        onClick={() => {
          computeTransformOriginFromTopCard()
          setCurrentImageIndex((prev) => {
            const nextIndex = (prev - 1 + backgroundImages.length) % backgroundImages.length
            setCardImages([
              { 
                id: 1, 
                image: backgroundImages[(nextIndex + 1) % backgroundImages.length], 
                imageIndex: (nextIndex + 1) % backgroundImages.length 
              },
              { 
                id: 2, 
                image: backgroundImages[(nextIndex + 2) % backgroundImages.length], 
                imageIndex: (nextIndex + 2) % backgroundImages.length 
              }
            ])
            return nextIndex
          })
        }}
      >
        &#8249;
      </button>
      <button 
        className="nav-arrow nav-arrow-right"
        onClick={() => {
          computeTransformOriginFromTopCard()
          setCurrentImageIndex((prev) => {
            const nextIndex = (prev + 1) % backgroundImages.length
            setCardImages([
              { 
                id: 1, 
                image: backgroundImages[(nextIndex + 1) % backgroundImages.length], 
                imageIndex: (nextIndex + 1) % backgroundImages.length 
              },
              { 
                id: 2, 
                image: backgroundImages[(nextIndex + 2) % backgroundImages.length], 
                imageIndex: (nextIndex + 2) % backgroundImages.length 
              }
            ])
            return nextIndex
          })
        }}
      >
        &#8250;
      </button>

      {/* Video Play Button with Wave Animation */}
      <div className="video-play-btn">
        {/* Wave elements positioned above the button */}
        <div className="wave-container">
          <div className="wave wave-1"></div>
          <div className="wave wave-2"></div>
          <div className="wave wave-3"></div>
        </div>
        <svg width="60" height="60" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="30" fill="rgba(255,255,255,0.9)" />
          <polygon points="24,18 24,42 42,30" fill="#333" />
        </svg>
      </div>
    </div>
  )
}

export default App
