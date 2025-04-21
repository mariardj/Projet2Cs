import React from 'react';
import { motion } from 'framer-motion';

const Arrow = ({ state, fill, className }) => {
    return <svg width="23" height="14" viewBox="0 0 23 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <motion.path
            d="M2.7025 0L11.5 8.65317L20.2975 0L23 2.66397L11.5 14L0 2.66397L2.7025 0Z"
            fill={fill}
            animate={{
                rotate: state ? 180 : 0,
            }}
            transition={{
                duration: 0.3
            }}
        />
    </svg>
}


export default Arrow;