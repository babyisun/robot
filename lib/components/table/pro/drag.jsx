/* eslint-disable import/extensions */
// import React, { Component } from 'react';
import { Form } from 'antd';
import { DragSource, DropTarget } from 'react-dnd';
import { React, Provider } from './edit.jsx';
// import HTML5Backend from 'react-dnd-html5-backend';
// const { React, Provider } = customReact;
// const { Provider } = React.createContext();

let dragingIndex = -1;

const Row = ({ form, index, isOver, connectDragSource, connectDropTarget, moveRow, ...props }) => {
    const style = { ...props.style, cursor: 'move' };
    let dragDom = null;
    let className = props.className;
    if (isOver) {
      if (index > dragingIndex) {
        className += ' drop-over-downward';
      }
      if (index < dragingIndex) {
        className += ' drop-over-upward';
      }
    }
    dragDom = connectDragSource(
      connectDropTarget(<tr {...props} className={className} style={style} />)
    );
    if (form) {
      return <Provider value={form}>
              {dragDom}
             </Provider>
    }
    return dragDom;
}

const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index;
    return {
      index: props.index,
    };
  },
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    props.moveRow(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

const DragableBodyRow = (hasEdit) => {
  const dealRow = hasEdit ? Form.create()(Row) : Row;
  return DropTarget('row', rowTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  }))(
    DragSource('row', rowSource, connect => ({
      connectDragSource: connect.dragSource(),
    }))(dealRow),
  );
}

const Drag = (base = class {}) => class extends base {
  constructor(props) {
    super(props);
    const { editId } = this.props;
    this.DropComponents = {
      row: DragableBodyRow(!!editId)
    }
  }

  moveRow = (dragIndex, hoverIndex) => {
    const { dragCb } = this.props;
    typeof(dragCb) === 'function' && dragCb(dragIndex, hoverIndex);
    return;
  };

}

export default Drag;
