import React from 'react';
import Block from './block';
import EmptyTipset from './emptyTipset'
import HeightLabel from './heightLabel'

class Generation extends React.Component {
  render() {
    const { blocks, height } = this.props;
    return (
      <div className="nowrap" style={{ alignItems: 'center', flexDirection: 'row', display: 'flex', margin: "2rem 0px"}}>
        <HeightLabel height={height} />
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
