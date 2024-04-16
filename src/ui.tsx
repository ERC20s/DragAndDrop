import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'


export interface BoxInfo {
box: {
    index: number,
    height: number,
    width: number,
    text: string,
    image: string,
    top: number,
    left: number,
    click: string,
  },
}

let box1: BoxInfo = {
  box: {
    index: 1,
    height: 100,
    width: 100,
    text: "box1",
    image: "",
    top: 150,
    left: 100,
    click: "",
},}

let box2: BoxInfo = {
  box: {
    index: 2,
    height: 100,
    width: 100,
    text: "box2",
    image: "",
    top: 150,
    left: 250,
    click: "",
},}

let highlight = {
  box: {
    height: 0,
    width: 0,
    text: "",
    image: "",
    top: 0,
    left: 0,
    click: "",
  },
}
//highlight box starts as invisible


export function setupUi() {

let drag = -1;
let drop = -1;
let toggle = false;
let log = "click some boxes.."
const resetHighlight = () => {
  highlight = {
      box: {
          height: 0,
          width: 0,
          text: "",
          image: "",
          top: 0,
          left: 0,
          click: "",
      },
  };
  drag = -1;
  drop = -1; // 'drop' is reset too
  toggle = false;

};

const DragThis = (boxData: BoxInfo, index: number) => {
if (toggle === true) {
  log = "You've already clicked a box. Click another to complete the drop."
  return
}
else{
    if (drag === index) {
      log = "You've already clicked a box. Click another to complete the drop."
  } else {
      highlight.box.height = boxData.box.height;
      highlight.box.width = boxData.box.width;  // Fixed width for highlights
      highlight.box.top = boxData.box.top;
      highlight.box.left = boxData.box.left;
      log = "Box is highlighted."
    }      

    log = "Dragging started from box" + index
  }
  drag = index;
};

const DropThat = (index: number) => {
  if (toggle === true) {
    if (drag === index) {
      log = "Double click means you changed your mind. Resetting."
      resetHighlight();
    }
    else {
      drop = index;
      log = "You clicked " + drag + " and then you clicked " + drop
      resetHighlight();
    }
  } else {
      if (drag === index) {
        log = "1st click. Source and target are the same:" + index;
        toggle = true
        return
      } else {
        drop = index;
        console.log("Drop completed from", drag, "to", drop);
        log = "Drop completed from" + drag + "to" +  drop
        resetHighlight(); // Reset after a successful drop
      }
  }
};

  const uiComponent = () => (
    <UiEntity
       uiTransform={{
        width: 500, // Adjusted to add unit
        height: 500, // Adjusted to add unit
        margin: '16px 0 8px 270px',

      }}
      uiBackground={{ color: Color4.create(0.5, 0.8, 0.1, 0.6) }}
    >
                    <Button
          key={"close"}
          value={"X"}
          uiTransform={{
            width: 25, // Adjusted to add unit
            height: 25, // Adjusted to add unit
            margin: { top: 0, right: 25,}
            
          }}
          onMouseDown={() => ReactEcsRenderer.setUiRenderer(close)}
        />
        <Button
          value={box1.box.text?.toString()}
          uiTransform={{
            width: box1.box.width, // Adjusted to add unit
            height: box1.box.height, // Adjusted to add unit
            margin: { top: box1.box.top, left: box1.box.left },
            positionType: 'absolute',
          }}
          uiBackground={{
            textureMode: 'center',
            texture: {
              src: box1.box.image ? box1.box.image : "https://docs.decentraland.org/images/media/nft-frames.png",
            },
          }}
        
          onMouseDown={() => [DragThis(box1, box1.box.index),]}
          onMouseUp={() => [DropThat(box1.box.index)]}
        />
        <Button
          value={box2.box.text}
          uiTransform={{
            width: box2.box.width, // Adjusted to add unit
            height: box2.box.height, // Adjusted to add unit
            margin: { top: box2.box.top, left: box2.box.left },
            positionType: 'absolute',
          }}
          uiBackground={{
            textureMode: 'center',
            texture: {
              src: box2.box.image ? box2.box.image : "https://docs.decentraland.org/images/media/nft-frames.png",
            },
          }}
        
          onMouseDown={() => [DragThis(box2, box2.box.index),]}
          onMouseUp={() => [DropThat(box2.box.index)]}
        />
    <Label
          value={log}
          uiTransform={{
            width: 'auto', // Adjusted to add unit
            height: 'auto', // Adjusted to add unit
            margin: { top: 100, left: 110 },
            positionType: 'absolute',
          }}
></Label>

    <UiEntity
       uiTransform={{
        width: highlight.box.width, // Adjusted to add unit
        height: highlight.box.height, // Adjusted to add unit
        margin: { top: highlight.box.top, left: highlight.box.left },
        positionType: 'absolute',

      }}
      uiBackground={{ color: Color4.create(0.5, 0.3, 0.7, 0.6) }}
    >
      </UiEntity>
    </UiEntity>
  );

  const close = () => (
    <UiEntity
       uiTransform={{
        width: 30, // Adjusted to add unit
        height: 25, // Adjusted to add unit
        margin: '16px 0 8px 270px',
  
      }}
      uiBackground={{ color: Color4.create(1, 1, 0, 0.6) }}
    >
           <Button
            value={"open"}
            uiTransform={{
              width: 30, // Adjusted to add unit
              height: 25, // Adjusted to add unit
              margin: { top: 0, left: 0,}
              
            }}
            onMouseDown={() => ReactEcsRenderer.setUiRenderer(uiComponent)}
          />
      </UiEntity>
  )

  ReactEcsRenderer.setUiRenderer(uiComponent);
  
}




