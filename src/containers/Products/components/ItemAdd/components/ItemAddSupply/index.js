// REACT
import React from 'react';

// REDUX
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getLength, getMass, getVolume } from '../../../../../../state/actions/helper';

// ==========

class ItemAddSupply extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      id: this.props.supply ? this.props.supply.id : 'default',
      qty: this.props.supply ? this.props.supply.qty : 0,
      qty_measure: this.props.supply ? this.props.supply.qty_measure : 'default'
    };
  };

  clear = () => {
    this.setState({
      id: this.props.supply ? this.props.supply.id : 'default',
      qty: this.props.supply ? this.props.supply.qty: 0,
      qty_measure: this.props.supply ? this.props.supply.qty_measure : 'default'
    });
  };

  changeSupplyMeasure = () => {
    if (this.props.selected.find(supply => supply.input === this.props.input)) {
      this.setState({qty_measure: 'default'});
      const index = this.props.selected.findIndex(supply => supply.input === this.props.input);
      delete this.props.selected[index].qty_measure;
    }
  };

  componentDidMount () {
    this.props.getLength();
    this.props.getMass();
    this.props.getVolume();
  };

  render () {
    const remainingSupplies = this.props.supplies.filter(supply =>
      !this.props.selected.find(selectedSupply => selectedSupply.id === supply.id)
    );
    let suppliesList = remainingSupplies;
    if (this.state.id !== 'default') {
      const currentSupply = this.props.supplies.find(supply => supply.id === this.state.id);
      suppliesList = currentSupply ? [currentSupply, ...remainingSupplies] : [...remainingSupplies];
    }

    return (
      <div className="field is-horizontal">
        <div className="field-body">
          <div className="field" style={{ width: '45%' }}>
            <div className="control">
              <div className="select">
                <select
                  id="id"
                  value={this.state.id}
                  onChange={event => {
                    this.setState({id: parseInt(event.target.value, 10)});
                    this.props.addSupply(this.props.input, parseInt(event.target.value, 10));
                    this.changeSupplyMeasure(this.props.input)
                  }}
                >
                  <option value="default" disabled>Supply</option>
                  {
                    suppliesList.map(supply => {
                      return (
                        <option key={supply.id} value={supply.id}>{supply.name}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>
          </div>
          <div className="field" style={{ width: '20%' }}>
            <div className="control">
              <input
                className="input"
                type="number"
                placeholder="Quantity"
                id="qty"
                min="0"
                value={this.state.qty}
                onChange={event => {
                  this.setState({qty: Number(event.target.value)});
                  this.props.addSupplyQty(this.props.input, Number(event.target.value));
                }}
              />
            </div>
          </div>
          <div className="field" style={{ width: '27%' }}>
            <div className="control">
              <div className="select">
                {
                  this.state.id === 'default' ? (
                    <select disabled></select>
                  ) : (
                    <select
                      id="measure"
                      value={this.state.qty_measure}
                      onChange={event => {
                        this.setState({qty_measure: event.target.value});
                        this.props.addSupplyMeasure(this.props.input, event.target.value);
                      }}
                      >
                      <option value="default" disabled>Measure</option>
                      {
                        (() => {
                          const currentSupply = this.props.supplies.find(supply => this.state.id === supply.id);
                          if (currentSupply) {
                            switch (currentSupply.measure_type) {
                              case 'length':
                                return this.props.lengthMeasures.map(measure => {
                                  return (
                                    <option key={measure} value={measure}>{measure}</option>
                                  )
                                });
                              case 'mass':
                                return this.props.massMeasures.map(measure => {
                                  return (
                                    <option key={measure} value={measure}>{measure}</option>
                                  )
                                });
                              case 'volume':
                                return this.props.volumeMeasures.map(measure => {
                                  return (
                                    <option key={measure} value={measure}>{measure}</option>
                                  );
                                });
                              default:
                                return (<option value='unit'>unit</option>);
                            }
                          } else {
                            return null;
                          }
                        })()
                      }
                    </select>
                  )
                }
              </div>
            </div>
          </div>
          <div className="control" style={{ width: '8%' }}>
            {
              this.props.i === this.props.length ? (
                <button
                  style={{ width: '100%' }}
                  type="button"
                  className="button is-success is-outlined"
                  onClick={() => this.props.appendInput()}
                >+</button>
              ) : (
                <button
                  style={{ width: '100%' }}
                  type="button"
                  className="button is-danger is-outlined"
                  onClick={() => {
                    this.props.deleteSupply(this.props.input);
                    this.props.deleteInput(this.props.i)
                  }}
                >-</button>
              )
            }
          </div>
        </div>
      </div>
    );
  };
};

const mapStateToProps = state => ({
  lengthMeasures: state.helper.lengthMeasures,
  massMeasures: state.helper.massMeasures,
  volumeMeasures: state.helper.volumeMeasures
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getLength,
  getMass,
  getVolume
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ItemAddSupply);
