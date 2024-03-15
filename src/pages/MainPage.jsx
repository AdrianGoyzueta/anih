import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import About from '../components/About';
import Service from '../components/Service';
import Benefits from "../components/Benefits"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import "../styles/mainPage.css"

export function Main ( { user, setUser } ) {
  return (
     <div className='bodyMain'>
      <Navbar user={user}/> 
      <About user={user}/>
      <Service/>
      <Benefits infoUser={{value: user, set: setUser}} />
      <Footer/>
    </div>
  );
}