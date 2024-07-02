import React, {
  // useEffect,
  useRef,
  // useState
} from 'react';
import { Panel, PanelBody, PanelProps } from 'src/components/base';

export const IssFeedTracker: React.FC<PanelProps> = ({ ...props }) => {
  const issTrackerWrapperRef = useRef<HTMLDivElement | null>(null);
  // const issTrackerFrameRef = useRef<HTMLIFrameElement | null>(null);
  // const [issTrackerFrameStyle, setIssTrackerFrameStyle] = useState({});
  // let resizeIssFrameTimeout: any;

  // const handleResize = () => {
  //   if (!issTrackerFrameRef.current || !issTrackerWrapperRef.current) return;
  //   const issTrackerWrapper = issTrackerWrapperRef.current;
  //   const issTrackerFrame = issTrackerFrameRef.current;
  //   const scaleForWidth =
  //     issTrackerWrapper.clientWidth / issTrackerFrame.clientWidth;
  //   const scaleForHeight =
  //     issTrackerWrapper.clientHeight / issTrackerFrame.clientHeight;

  //   clearTimeout(resizeIssFrameTimeout);
  //   resizeIssFrameTimeout = setTimeout(() => {
  //     const newStyle = {
  //       transform: `scale(${scaleForWidth})`,
  //     };

  //     if (
  //       issTrackerFrame.clientHeight * scaleForWidth - issTrackerWrapper.clientHeight >=
  //       0
  //     ) {
  //       newStyle.transform = `scale(${scaleForHeight})`;
  //     }

  //     setIssTrackerFrameStyle(newStyle);
  //   }, 500);
  // };

  // useEffect(() => {
  //   window.addEventListener('resize', handleResize);
  //   handleResize();

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <Panel {...props}>
      <PanelBody>
        <div className="iss-track-col-wrapper" ref={issTrackerWrapperRef}>
          <iframe
            className="aspect-16-9 iss-tracker"
            // ref={issTrackerFrameRef}
            // style={issTrackerFrameStyle}
            src="https://isstracker.spaceflight.esa.int/"
            marginWidth={0}
            marginHeight={0}
            frameBorder={0}
            scrolling="no"
          ></iframe>
        </div>
      </PanelBody>
    </Panel>
  );
};
