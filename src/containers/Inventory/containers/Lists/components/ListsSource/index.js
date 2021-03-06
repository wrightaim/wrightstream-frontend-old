// REACT
import React from 'react';

// COMPONENTS
import ListsSupply from './components/ListsSupply';

// ==========

class ListsSource extends React.Component {
  render () {
    let supplies = [];
    const sourceSupplies = this.props.supplies.filter(supply => supply.source_id === this.props.source.id);
    for (let supply of this.props.estimatorSupplies) {
      if (sourceSupplies.find(sourceSupply => sourceSupply.id === supply.supply_id)) {
        supplies = [...supplies, supply];
      }
    }

    return (
      <div>
        <h1 className="title is-5">
          {
            supplies.length > 0 ? this.props.source.name : null
          }
        </h1>
        {
          supplies.length > 0 ? (
            <ul style={{paddingBottom: '1rem'}}>
              {
                supplies.map(supply => {
                  return (
                    <ListsSupply
                      key={supply.supply_id}
                      supply={supply}
                      supplies={this.props.supplies}
                    />
                  );
                })
              }
            </ul>
          ) : null
        }
      </div>
    );
  };
};

export default ListsSource;
