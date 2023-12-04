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
import {Video, video} from 'expo-av'


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
    }, []);
            
        // Get the download URLs for all media files
        async function downloadFile(url, filename, isVideo) {
            try{
                // Request Permission
                const {status} = await MediaLibrary.requestPermissionsAsync();

                if(status !== 'granted'){
                    Alert.alert('Permission needed', 'This App Need Access to your Media Library');
                    return;
                }

                const fileUri = FileSystem.cacheDirectory + filename;
                console.log('Starting Download...!!');
                const downloadResumable = FileSystem.createDownloadResumable(url, fileUri, {},false);
                const {uri} = await downloadResumable.downloadAsync(null, {shouldCache: false});
                console.log('Donwload Complete, uri');

                if (isVideo){
                    const {uri:thumbnailUri} = await VideoThumnails.getThumbnailAsync(uri, {time: 1000});
                    console.log('Thumbnail created:', thumbnailUri);
                }
                const asset = await MediaLibrary.createAssetAsync(uri);
                console.log('Asset created:', asset);

                // Show Alert with File Location
                Alert.alert('Download Successful, ' `File saved to: ${fileUri}`);

            } catch (e) {
                console.log(e);
            }

    
        
    

return (
    <View style={styles.container}>
    <Text style={styles.title}>Python Cheat Sheet</Text>
    {mediaData.map((media, index) => {
        const {url, metadata} = media;
        const {name, contentType} = metadata;
        const isVideo = contentType.includes('video');
        return (
            <View key={index} style={styles.imageContainer}>
                {isVideo ? (
                    <Video 
                        source = {{uri: url}} 
                        style = {styles.image}
                        resizeMode="contain"
                        useNativeControls
                    />
                ) : (
                    <Image 
                    source = {{uri: url}} 
                    style = {styles.image}
                    resizeMode="contain"
                    />
                )}

                <Button 
                    title={`Download ${name}`}
                    onPress = {() => downloadFile(url, name, isVideo)}
                />
            </View>
        );
    })}
    <StatusBar style="auto" />
    </View>
);

        }
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                marginTop: 150,
            },
            title: {
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: 20

            },
            imageContainer: {
                marginBottom: 50,
            },
            image: {
                width: 200,
                height: 200,
                borderRadius: 10,
                marginBottom: 10
            }
        })

    }
