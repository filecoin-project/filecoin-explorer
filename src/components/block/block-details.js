import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Block from './block';
import Badge from '../badge/badge';
import Generation from './generation';
import MessagesTable from '../table/messages-table.js';
import MessageReceiptsTable from '../table/message-receipts-table.js';
import ErrorModal from '../error/error-modal.js';
import Spinner from '../loading/spinner';
import arrowUp from './arrow-up.svg';
import arrowDown from './arrow-down.svg';
import { ErrorContext } from '../error';

class BlockDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      block: false,
      loading: true,
      paginating: false
    };
  }

  async getData() {
    const { cid, chainApi } = this.props;
    this.setState({ cid, loading: true });
    try {
      let block = null;
      if (cid) {
        block = await chainApi.fetchBlock(cid);
      } else {
        block = await chainApi.fetchHeadBlock();
      }
      const parents = await chainApi.fetchParents(block);
      // const children = await chainApi.fetchChildren(block)
      const children = [];
      this.setState({ cid, block, parents, children, loading: false });
    } catch (err) {
      this.context.setError(err)
      this.setState({ cid, loading: false });
    }
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cid !== this.props.cid) {
      this.getData();
    }
  }

  render() {
    const { block, parents, children, loading } = this.state;
    const { hash } = window.location;

    if (!loading && !block) {
      return (
        <div>
          {this.state.cid} : {this.state.errMsg}
        </div>
      );
    }

    if (loading) {
      return (
        <>
          <h3>Block details are loading...</h3>
        </>
      );
    }

    return (
      <div>
        {block ? (
          <div>
            <div>
              <div className="dib">
                <Block block={block} />
              </div>
              <div
                className="dib relative ml4"
                style={{ height: 200, width: 100 }}
              >
                {children && children.length ? (
                  <Link
                    to={`/blocks/${children[0].cid}${hash}`}
                    className="db absolute top-0 ph2 pv1 charcoal bg-snow br1 f6 link focus-outline"
                    title="Newer"
                  >
                    <img src={arrowUp} alt="" className="dib v-mid" />
                  </Link>
                ) : null}
                {block.header.parents ? (
                  <Link
                    to={`/blocks/${block.header.parents[0]['/']}${hash}`}
                    className="db absolute bottom-0 ph2 pv1 charcoal bg-snow br1 f6 link focus-outline"
                    title="Older"
                  >
                    <img src={arrowDown} alt="" className="dib v-mid" />
                  </Link>
                ) : null}
              </div>
            </div>
            <section className="pv3">
              <h2 className="f5 fw3 ttu tracked teal">
                Parents <Badge>{parents ? parents.length : 0}</Badge>
              </h2>
              <Generation blocks={parents} />
            </section>
            <section className="pv3">
              <h2 className="f5 fw3 ttu tracked teal">
                Messages{' '}
                <Badge>{block.messages ? block.messages.length : 0}</Badge>
              </h2>
              <MessagesTable data={block.messages || []} />
            </section>
            {block.messages && block.messages.length ? (
              <section className="pv3">
                <h2 className="f5 fw3 ttu tracked teal">
                  Message Receipts{' '}
                  <Badge>
                    {block.messageReceipts ? block.messageReceipts.length : 0}
                  </Badge>
                </h2>
                <MessageReceiptsTable data={block.messageReceipts || []} />
              </section>
            ) : null}
          </div>
        ) : null}
        <Spinner loading={loading} style={{ top: '26px', left: '31px' }} />
      </div>
    );
  }
}

BlockDetails.contextType = ErrorContext

export default BlockDetails;
