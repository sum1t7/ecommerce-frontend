import styles from '../Styles/styles.module.scss';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { slide, scale } from '../Styles/anim';

interface LinkData {
  title: string;
  href: string;
  index: number;
}

interface IndexProps {
  data: LinkData;
  isActive: boolean;
  open: boolean;
  setSelectedIndicator: (href: string) => void;

 }

export default function Links({data, isActive, setSelectedIndicator}: IndexProps) {
  
    const { title, href, index} = data;
  
    return (
      <motion.div className={styles.link} onMouseEnter={() => {setSelectedIndicator(href)}} custom={index} variants={slide} initial="initial" animate="enter" exit="exit">
        <motion.div variants={scale} animate={isActive ? "open" : "closed"} className={styles.indicator}></motion.div>
        <Link href={href} >{title}</Link>
      </motion.div>
    )
  }