'use client';

import { useEffect, useState } from 'react';
import styles from './LandingAnimation.module.css';

const LandingAnimation = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 2500);
  }, []);

  if (isVisible)
    return (
      <div className={styles.container}>
        <svg
          className={styles.svg}
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 500 500"
          xmlSpace="preserve"
        >
          <g id="OBJECTS">
            <g>
              <text
                transform="matrix(1 0 0 1 105.1556 357.335)"
                className={styles.logoName}
                fillOpacity={0}
                stroke="#fff"
                strokeWidth="3"
              >
                NADER CHATTI
              </text>
            </g>
            <g>
              <path
                d="M341.113,258.896c-5.633,0.708-12.441,1.054-20.438,1.054
              c-7.726,0-13.555-0.422-17.486-1.265c-4.082-0.708-7.064-2.455-8.947-5.271c-1.898-2.801-2.997-7.018-3.268-12.636
              c-0.286-7.305-0.422-14.881-0.422-22.743v-73.107c-9.413,1.13-16.959,3.268-22.652,6.431c-5.678,3.163-10.001,7.621-12.953,13.374
              c-2.802,5.618-4.744,12.576-5.784,20.86c-1.054,8.284-1.581,19.098-1.581,32.442c0,1.1,0,2.184,0.015,3.253l38.753,66.164
              l2.018,3.449c6.25,0.858,13.51,1.28,21.779,1.28c5.753,0,11.01-0.211,15.784-0.632c8.72-0.573,16.507-1.612,23.39-3.163v-30.544
              C346.083,258.398,343.357,258.76,341.113,258.896z"
                fillOpacity={0}
                stroke="#fff"
                strokeWidth="3"
              />

              <path
                d="M280.29,289.013
              c0.283,0.484,0.575,0.981,0.866,1.478c-1.789,0-3.578,0-3.578,0h-41.919l-81.521-139.028c0,0-1.729-2.949-3.458-5.898
              c1.729,0,3.458,0,3.458,0h42.13l81.31,138.818C277.578,284.383,278.832,286.524,280.29,289.013z"
                fillOpacity={0}
                stroke="#fff"
                strokeWidth="3"
              />

              <polygon
                points="154.137,151.135 
              194.161,219.596 194.161,290.491 154.137,290.491 "
                fillOpacity={0}
                stroke="#fff"
                strokeWidth="3"
              />

              <path
                d="M337.739,145.981
              c-15.544-2.379-31.56-2.95-47.187-1.054c0,0,0,38.691,0,38.691c3.231-3.317,8.52-5.263,12.902-6.2
              c11.244-2.404,23.145-1.449,34.495-0.26c4.91,0.572,8.419,0.919,10.528,1.055V148.09
              C345.948,147.397,342.363,146.689,337.739,145.981z"
                fillOpacity={0}
                stroke="#fff"
                strokeWidth="3"
              />
            </g>
          </g>
        </svg>
      </div>
    );
};

export default LandingAnimation;
