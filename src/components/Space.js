import React, { Fragment, useContext } from "react";
import styled from "styled-components";

import { FloatingSpaceContext } from "../contexts/FloatingSpaceContext";
import { RoomNames } from "../utils/constants";

const Space = () => {
  const { currentFloatingSpaces, setFloatingSpaces } = useContext(FloatingSpaceContext);

  const launchFloatingSpace = (floatingSpace) => {
    let resultantSpaces = null;
    if(currentFloatingSpaces && currentFloatingSpaces.length > 0){
      if(currentFloatingSpaces.indexOf(floatingSpace) > -1) {
        resultantSpaces = currentFloatingSpaces;
      } else if((RoomNames.indexOf(floatingSpace) > -1)){
        let replaceIndex;
        for(let instance of RoomNames) {
          if(currentFloatingSpaces.indexOf(instance) > -1) {
            replaceIndex = currentFloatingSpaces.indexOf(instance)
          }
        }
        if(replaceIndex > -1){
          let spliceJitsiDuplicates = [...currentFloatingSpaces]; // Prepare for splice
          spliceJitsiDuplicates.splice(replaceIndex, 1, floatingSpace);
          resultantSpaces = [...spliceJitsiDuplicates];
        }else{
          resultantSpaces = [...currentFloatingSpaces, floatingSpace];
        }
      } else {
        resultantSpaces = [...currentFloatingSpaces, floatingSpace];
      }
    }else{
      resultantSpaces = [floatingSpace];
    }
    setFloatingSpaces(resultantSpaces);
  }

  const portalStyle = {
    marginTop: "10px"
  };

  const Headline = styled.h6`
    font-weight: 100;
    font-size: 1.3rem;
    padding: 1rem;
  `;

  const SpaceSelector = styled.nav`
    padding-bottom: 1rem;
  `;

  const SpaceInfo = styled.p`
    font-size: 2rem;
  `;

  const CurrentSpace = styled.span`
    color: pink;
  `;

  const Disclaimer = styled.div`
    position: relative;
    top: 770px;
    background: unset;
  `;

  const SpaceWindowInfo = styled.p`
    position: relative;
    top: 790px;
    font-size: 2rem;
  `;

  const displayJoinedSpaces = (floatingSpaceWindows) => {
    let windowsWithoutPlaceholders = floatingSpaceWindows.filter(item => item);
    if(windowsWithoutPlaceholders.length > 0) {
      if(windowsWithoutPlaceholders.length > 2) {
        let nameCount = windowsWithoutPlaceholders.length;
        return windowsWithoutPlaceholders.slice(0, nameCount - 2).join(", ") + ", " + windowsWithoutPlaceholders.slice(nameCount - 2, nameCount).join(" & ");
      }else{
        return windowsWithoutPlaceholders.join(" & ");
      }
    }else{
      return null;
    }
  }

  return (
    <SpaceSelector>
      <span>
        <Headline>Welcome to MetaGame</Headline>
        <span>
          More Info on <a href="https://metagame.wtf">the main website</a>
        </span>
        <SpaceInfo>
          {displayJoinedSpaces(currentFloatingSpaces) ?
            <Fragment>
              You're in the <CurrentSpace>{displayJoinedSpaces(currentFloatingSpaces)}</CurrentSpace>!
            </Fragment>
            : "Click a room on the map to join!"
          }
        </SpaceInfo>
      </span>

      <div className="map-container">
        {/*
        <span className="mapInstructions">
          Click a location to join a conversation.
        </span>
        */}
        <img src="metaspace.png" className="image-map" alt="map" />
        <div
          className="click-zone a"
          onClick={() => launchFloatingSpace("House of Defiance")}
        >
          <span className="roomName">House of Defiance</span>
          <div className="click-zone-highlight a"></div>
        </div>
        <div className="click-zone b" onClick={() => launchFloatingSpace("House of DAOs")}>
          <span className="roomName">House of DAOs</span>
          <div className="click-zone-highlight b"></div>
        </div>
        <div className="click-zone c" onClick={() => launchFloatingSpace("Raid Guild")}>
          <span className="roomName">Raid Guild</span>
          <div className="click-zone-highlight c"></div>
        </div>
        <div
          className="click-zone d"
          data-zone="stress-test-arena"
          onClick={() => launchFloatingSpace("Stress Test Arena")}
        >
          <span className="roomName" style={portalStyle}>
            Stress Test Arena
          </span>
          <div className="click-zone-highlight d"></div>
        </div>
        <div
          className="click-zone e"
          onClick={() => launchFloatingSpace("House of Adoption")}
        >
          <span className="roomName">House of Adoption</span>
          <div className="click-zone-highlight e"></div>
        </div>
        <div
          className="click-zone f"
          onClick={() => launchFloatingSpace("loft.radio")}
        >
          <span className="roomName">loft.radio</span>
          <div className="click-zone-highlight f"></div>
        </div>
        <div
          className="click-zone g"
          onClick={() => launchFloatingSpace("rTrees")}
        >
          <span className="roomName">rTrees</span>
          <div className="click-zone-highlight g"></div>
        </div>
      </div>
      <Disclaimer>
        Feel free to make improvements to the map,
        download the .psd file{" "}
        <a href="https://www.dropbox.com/s/cocwaannzy8lqty/Interspace%20v0.2.psd?dl=0">
          here
        </a>{" "}
        and share with us <a href="https://discord.gg/cZjqQmE">there</a>
      </Disclaimer>
      <SpaceWindowInfo>
        {displayJoinedSpaces(currentFloatingSpaces) ?
          "Position your window(s) down below"
          : null
        }
        
      </SpaceWindowInfo>
    </SpaceSelector>
  );
};

export default Space;
