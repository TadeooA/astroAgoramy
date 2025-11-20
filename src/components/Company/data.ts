// types
import type { TeamMember } from './types'

// images
import img1 from '../../assets/images/avatars/img-1.jpg'
import img2 from '../../assets/images/avatars/img-2.jpg'
import img3 from '../../assets/images/avatars/img-3.jpg'
import img4 from '../../assets/images/avatars/img-4.jpg'
import img5 from '../../assets/images/avatars/img-5.jpg'
import img6 from '../../assets/images/avatars/img-6.jpg'
import img7 from '../../assets/images/avatars/img-7.jpg'
import img8 from '../../assets/images/avatars/img-8.jpg'

const teamMembers: TeamMember[] = [
  {
    avatar: img1.src,
    name: 'Ana Russo',
    designation: 'CEO',
  },
  {
    avatar: img2.src,
    name: 'Danette Payne',
    designation: 'CTO',
  },
  {
    avatar: img3.src,
    name: 'Tammy Ward',
    designation: 'Vicepresidente, Desarrollo de Producto',
  },
  {
    avatar: img4.src,
    name: 'Paul Moore',
    designation: 'Desarrollador Back-End',
  },
  {
    avatar: img5.src,
    name: 'Harry Burris',
    designation: 'Desarrollador PHP',
  },
  {
    avatar: img6.src,
    name: 'Patricia Ferraro',
    designation: 'Diseñador Web',
  },
  {
    avatar: img7.src,
    name: 'Robert Smith',
    designation: 'Diseñador Gráfico',
  },
  {
    avatar: img8.src,
    name: 'Lindsay Clark',
    designation: 'Diseñador Web',
  },
  {
    avatar: img1.src,
    name: 'Lindsay Clark',
    designation: 'Desarrollador Front-End',
  },
  {
    avatar: img2.src,
    name: 'Ernest Griffith',
    designation: 'Desarrollador PHP',
  },
  {
    avatar: img3.src,
    name: 'Cecelia Poole',
    designation: 'Desarrollador Back-End',
  },
  {
    avatar: img4.src,
    name: 'Morris Hall',
    designation: 'Diseñador Gráfico',
  },
]

export { teamMembers }
