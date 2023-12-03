import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert, Image, Button } from "react-native";
import {firebase} from './config'
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'
import * as VideoThumnails from 'expo-video-thumbnails'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import * as DocumentPicker from 'expo-document-picker'
import React, {useState, useEffect} from "react";
import {video} from 'expo-av'


export default function App(){
    const [mediaData, setMediaData] = useState([]);

    useEffect(() => {
        async function getMediaData(){
            // get reference to all media files in firebase storage
            const mediaRefs = [
                firebase.storage().ref('python.webp'),
                firebase.storage().ref('java.jpeg'),
                firebase.storage().ref('js.jpeg'),
                firebase.storage().ref('php.jpeg'),
             
            ];

            // Get Download URLs metadata for all media files
            const mediaInfo = await Promise.all(mediaRefs.map(async (ref) => {
                const url = await ref.getDownloadURL();
                const metadata = await ref.getMetadata();
                return {url, metadata};
            }));
            setMediaData(mediaInfo);
        }
            getMediaData();
    }, [],);
            
            // Get the download URLs for all media files
            const downloadUrls = mediaInfo.map(({url, metadata}) => {

            }))
        }
    })

return (
    <View style={styles.container}>
    <Text>Hello World</Text>
    <StatusBar style="auto" />
    </View>
);


}