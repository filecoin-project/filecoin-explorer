import React from 'react';
import Block from './block';
import EmptyTipset from './emptyTipset'
import Separator from './separator'

class Generation extends React.Component {
  render() {
    const { blocks, height } = this.props;
    return (
      <div className="nowrap" style={{ margin: "2rem 0px"}}>
        <Separator height={height} />
        {blocks && blocks.length ? blocks.map((b, i) => {
          return (
            <div className="dib pr4" style={{ width: 250 }} key={i}>
              <Block truncate block={b} secondary={i !== 0} />
            </div>
          );
        })
          : <EmptyTipset height={height} />
      }
      </div>
    );
  }
}

export default Generation;
