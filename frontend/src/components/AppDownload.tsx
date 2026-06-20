import Image from 'next/image';
import styles from './AppDownload.module.css';
import ScrollReveal from './ScrollReveal';

export default function AppDownload() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.content}>
            <ScrollReveal animation="fade-up">
              <span className="caption">Mobile Experience</span>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={200}>
              <h2 className={styles.title}>SchoolHub in Your Pocket</h2>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={400}>
              <p className={styles.description}>
                Take your digital campus everywhere. Access results, manage assignments, and stay connected with your school community on the go.
              </p>
            </ScrollReveal>
            
            <ScrollReveal animation="fade-up" delay={600}>
              <div className={styles.actions}>
                <a href="#" className={styles.storeButton}>
                   <div className={styles.buttonInner}>
                      <span className={styles.smallText}>Download on the</span>
                      <span className={styles.largeText}>App Store</span>
                   </div>
                </a>
                <a href="#" className={styles.storeButton}>
                   <div className={styles.buttonInner}>
                      <span className={styles.smallText}>Get it on</span>
                      <span className={styles.largeText}>Google Play</span>
                   </div>
                </a>
              </div>
            </ScrollReveal>
          </div>
          
          <div className={styles.imageContainer}>
             <ScrollReveal animation="zoom-in" delay={300} className={styles.monsterWrapper}>
                <Image 
                  src="/monster_studying.png" 
                  alt="Studying Monster" 
                  width={300} 
                  height={300} 
                  className={styles.monster}
                />
             </ScrollReveal>
             <ScrollReveal animation="slide-left" delay={500} className={styles.phoneWrapper}>
                <div className={styles.phoneFrame}>
                   <Image 
                      src="/photo12.jpeg" 
                      alt="App Interface" 
                      fill 
                      style={{ objectFit: 'cover' }}
                      className={styles.screenImage}
                   />
                </div>
             </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
