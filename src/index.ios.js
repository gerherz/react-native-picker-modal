import React from "react";
import {
  Modal,
  Picker,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialIcons";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end"
  },
  modalContent: {
    padding: 0,
    backgroundColor: "#d1d5db"
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    textAlign: "center",
    flex: 1
  },
  buttonBar: {
    alignItems: "flex-end",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "lightgrey",
    backgroundColor: "#f0f0f2"
  },
  buttonView: {
    padding: 12
  },
  buttonText: {
    color: "#006BFF",
    fontSize: 16,
    fontWeight: "bold"
  }
});

class PickerModal extends React.Component {
  static propTypes = {
    doneLabel: PropTypes.string,
    onClose: PropTypes.func,
    onValueChange: PropTypes.func,
    style: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
      PropTypes.array
    ])
  };

  static defaultProps = {
    onClose: () => {},
    onValueChange: () => {},
    style: null,
    doneLabel: "Done"
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    this.bindings = {
      togglePicker: this.togglePicker.bind(this),
      closePicker: this.closePicker.bind(this),
      onValueChange: this.onValueChange.bind(this)
    };
  }

  togglePicker() {
    this.setState(state => {
      state.open = !state.open;
      return state;
    });
  }

  closePicker() {
    this.props.onClose();
    this.setState({ open: false });
  }

  onValueChange() {
    this.props.onValueChange(...arguments);
  }

  getSelectedItem() {
    const childrenArray = React.Children.toArray(this.props.children);
    let selected = childrenArray.find(
      child => child.props.value === this.props.selectedValue
    );

    if (selected) {
      return selected;
    }

    return childrenArray[0];
  }

  render() {
    const props = Object.assign({}, this.props);
    delete props.style;
    delete props.children;
    delete props.onValueChange;

    const picker = (
      <Modal
        animationType={"slide"}
        visible={this.state.open}
        transparent={true}
        onRequestClose={this.bindings.togglePicker}
      >
        <TouchableWithoutFeedback onPress={this.bindings.closePicker}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.buttonBar}>
                <ModalButton
                  label={props.doneLabel}
                  onPress={this.bindings.closePicker}
                />
              </View>
              <Picker {...props} onValueChange={this.bindings.onValueChange}>
                {this.props.children}
              </Picker>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );

    return (
      <View>
        <TouchableHighlight
          underlayColor={"#DDD"}
          style={[styles.textContainer, this.props.style]}
          onPress={this.bindings.togglePicker}
        >
          <View style={[styles.textContainer, this.props.style]}>
            <Text style={styles.text}>
              {this.getSelectedItem().props.label}
            </Text>
            <Icon name="arrow-drop-down" size={30} color="black" />
          </View>
        </TouchableHighlight>
        {picker}
      </View>
    );
  }
}

class ModalButton extends React.Component {
  render() {
    const { label, onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonView}>
          <Text allowFontScaling={false} style={styles.buttonText}>
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default PickerModal;
