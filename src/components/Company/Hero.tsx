import { ParallaxBanner, ParallaxProvider } from 'react-scroll-parallax'

// images
import coworking from '../../assets/images/hero/coworking1.jpg'

const Hero = () => {
  return (
    <>
      <section className="pt-36 pb-24 relative">
        <div className="container">
          <div className="text-center">
            <h1 className="text-3xl/tight sm:text-4xl/tight lg:text-5xl/tight font-semibold mb-5">
              Conoce a Agoramy: Tu Socio Tecnológico para Farmacias
            </h1>
            <p className="sm:text-lg text-gray-500">
              Somos líderes en soluciones POS para farmacias, ferreterías y tiendas en México. Nuestra misión es potenciar tu negocio con tecnología moderna, eficiente y fácil de usar, adaptada a las necesidades de tu giro.
            </p>
          </div>
        </div>
      </section>
      <section>
        <span className="flex justify-center items-center relative z-20 translate-y-1/2">
          <div className="bg-primary text-white rounded-md text-sm font-semibold flex-none shadow shadow-primary/20 cursor-pointer hover:shadow-lg hover:shadow-primary/30 focus:shadow-none focus:outline focus:outline-primary/30 px-16 py-3">
            Nuestra Historia
          </div>
        </span>

        <ParallaxProvider>
          <ParallaxBanner
            layers={[
              {
                image: coworking.src,
                speed: -55,
                style: { backgroundSize: 'contain' },
              },
            ]}
            className="flex items-center md:py-80 py-44 jarallax"
          />
        </ParallaxProvider>
      </section>
    </>
  )
}

export default Hero
