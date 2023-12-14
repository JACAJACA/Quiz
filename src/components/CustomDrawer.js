import React from "react";
import { View, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";

const CustomDrawer = props => {
    return (
      <View style={{flex: 1}}>
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{backgroundColor: 'rgb(96, 108, 56)'}}>
          <View
            style={{padding: 30}}>
            <Text
              style={{
                color: 'rgb(254, 250, 224)',
                fontSize: 30,
                fontFamily: 'RobotoSlab-Bold',
                marginBottom: 5,
              }}>
              Quiz app
            </Text>
          </View>
          <View style={{ borderTopWidth: 4, borderTopColor: 'rgb(221, 161, 94)'}}></View>
          <View style={{flex: 1, backgroundColor: 'rgb(40, 54, 24)', paddingTop: 10, paddingBottom: 540}}>
            <DrawerItemList {...props} />
          </View>
        </DrawerContentScrollView>
      </View>
    );
  };
  
  export default CustomDrawer;