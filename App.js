import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

const Images = [
    {
        uri: "https://i.imgur.com/mxgtWKt.jpg",
        label: "1"
    },

    {
        uri: "https://i.imgur.com/XCRnNWn.jpg",
        label: "2"
    },

    {
        uri: "https://i.imgur.com/dqQX1K0.jpg",
        label: "3"
    },

    {
        uri: "https://i.imgur.com/nZXbSbh.jpg",
        label: "4"
    },

    {
        uri: "https://i.imgur.com/mXCjefR.jpg",
        label: "5"
    },

    {
        uri: "https://i.imgur.com/AGyxRcc.jpg",
        label: "6"
    }
];

export default class App extends Component {
    state = {
        index: 0,
        imageWidth: null
    }

    nextImage(event) {
        const { index, imageWidth } = this.state,
              X = event.nativeEvent.locationX,
              delta = (X < imageWidth/2) ? -1 : +1;

        let newIndex = (index + delta) % Images.length;


        if (newIndex < 0) {
            newIndex = Images.length - Math.abs(newIndex);
        }

        this.setState({
            index: newIndex
        });
    }

    onImageLayout(event) {
        this.setState({
            imageWidth: event.nativeEvent.layout.width
        });
    }

    render() {
        const image = Images[this.state.index];
//用两个空的View，目的是让图片垂直居中
        return (
            <View style={styles.container}>
                <View style={styles.empty} />
                <TouchableHighlight onPress={this.nextImage.bind(this)}
                                    style={styles.image}>
                    <Image source={{uri: image.uri}}
                           style={styles.image}
                           onLayout={this.onImageLayout.bind(this)}>
                        <Text style={styles.imageLabel}>{image.label}</Text>
                    </Image>
                </TouchableHighlight>
                <View style={styles.empty} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#abcdef',
    },
    image: {
        flex: 2,
        width: 320,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    imageLabel: {
        textAlign: 'center',
        backgroundColor: 'rgba(100, 100, 100, 0.5)',
        color: 'white',
        width: 320
    },
    empty: {
        flex: 1
    }
});
