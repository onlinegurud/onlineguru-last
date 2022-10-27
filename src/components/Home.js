import { React } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

import img1 from './img1.png';
import img2 from '../resource/img2.svg';
import img3 from '../resource/img3.jpg';
import img4 from './whatsapp.png';

const Home = () => {
  document.addEventListener('mousemove', parallax);

  function parallax(e) {
    this.querySelectorAll('.lay').forEach((element) => {
      var x = (window.innerWidth - e.pageX * 3) / 90;
      var y = (window.innerHeight - e.pageY * 3) / 90;

      element.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
  }

  document.addEventListener('mousemove', parallax2);

  function parallax2(e) {
    this.querySelectorAll('.lay2').forEach((element) => {
      var x = (window.innerWidth - e.pageX * 5) / 90;
      var y = (window.innerHeight - e.pageY * 5) / 90;

      element.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
  }

  return (
    <div>
      <div className="showcase">
        <img className="img1" src={img1}></img>
        {/* <img className="img2 lay2" src={img2}></img> */}
        {/* <div className="layer"></div>
        <div className="layer_2"></div> */}
        <div className="company-detail">
          <h1>Online Guru</h1>

          <a href="http://localhost:3000/session/signin">
            <h2 id="hh2">BOOK YOUR CLASSES NOW!</h2>
          </a>

          <h2>GET YOUR CHILDREN BEST ONLINE TUTORS</h2>
        </div>
      </div>

      <div className="about-us">
        <div className="para">
          <h3>02</h3>
          <h2>ONLINE GURU</h2>
          <p className="para-1">
            was established in October 2020 to improve your education with us.
          </p>
          <p>
            We offer different online tuition classes under the supervision of highly qualified
            teacher all over the world .Learn new knowledge and skills in a variety of ways, from
            engaging video lectures and dynamic graphics to data visualizations and interactive
            elements.
          </p>
        </div>
        <img
          className="about-img"
          src={
            'https://images.unsplash.com/photo-1627556704302-624286467c65?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80'
          }
        ></img>
      </div>

      <div className="abt-other">
        <div className="other">
          <h2>03</h2>
          <h1>OUR SERVICE</h1>
          <div className="inner-abt-other">
            <p>
              24/7 access<br></br>Ready to serve any time, day or night and to assist in multiple
              languages. Always happy, consistent and non-judgmental.
            </p>
          </div>
        </div>

        <div className="other">
          <h2>04</h2>
          <h1>PERSONALIZED CONNECTIONS</h1>
          <div className="inner-abt-other">
            <p>
              Focus , Motivation , Dedication.
              <br></br>Create face-to-face student interactions strengthened with perception of
              emotions and the learning of preferences and interests. we offer the highest standard
              of professional service.
            </p>
          </div>
        </div>
      </div>

      <div className="about-us5">
        <h2 class="j1">How do I attend lessons on ONLINE GURU?</h2>

        <div class="j2">
          <div class="j3">
            <div class="j4">1</div>
            <div class="j5">
              <p class="t6">Request a Lesson</p>
              <p class="t7">
                Tell us what you need help with. We will connect you with an experienced teacher,
                and set up the first lesson.
              </p>
            </div>
          </div>

          <div class="j3">
            <div class="j4">2</div>
            <div class="j5">
              <p class="t6">Attend the First Class</p>
              <p class="t7">
                Attend the first lesson and get comfortable with the classroom. If you are not
                satisfied with the first lesson, the first lesson will not be charged
              </p>
            </div>
          </div>

          <div class="j3">
            <div class="j4">3</div>
            <div class="j5">
              <p class="t6">Enjoy Learning!</p>
              <p class="t7">
                Once you are satisfied with the teacher, a weekly schedule will be set up at your
                convenience. The same teacher will continue taking classes on a weekly basis.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="about-us">
        <img
          className="about-img"
          src="https://images.unsplash.com/photo-1549980384-d61217e50c4b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
        ></img>
        <div className="para">
          <h3>05</h3>
          <h2>OUR VISION</h2>
          <p className="para-1">
            Create an engaging experience for students online with authentic human interactions at
            any time of day.
          </p>
          <p>
            Demonstrating your knowledge is a critical part of learning. ONLINE GURU courses and
            programs provide a space to practice with quizzes, open response assessments, virtual
            environments, and more.
          </p>
        </div>
      </div>

      <div className="about-us">
        <div className="para">
          <h3>06</h3>
          <h2>OUR POSITION</h2>
          <p className="para-1">
            Executive Education courses from experience teacher offer the skills you need to pivot
            and expand your career.
          </p>
          <p>
            Explore new skills, deepen existing passions, and get lost in creativity. What you find
            just might surprise and inspire you.Move your creative journey forward without putting
            life on hold. ONLINE GURU’s short online classes help you find inspiration that fits
            your routine.
          </p>
        </div>
        <img
          className="about-img"
          src="https://images.unsplash.com/photo-1535905557558-afc4877a26fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
        ></img>
      </div>
    </div>
  );
};

export default Home;
