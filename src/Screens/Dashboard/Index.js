import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TouchableHighlight, FlatList, Image, ScrollView } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';
import DrawerModal from '../../Component/DrawerModal';
import Octicons from 'react-native-vector-icons/Octicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Calendar } from 'react-native-calendars';
import Swiper from 'react-native-swiper';

// Dimensions for the screen width
const { width } = Dimensions.get('window');

// images
const image1 = require('../../assets/Image/slideImg1.jpeg');
const image2 = require('../../assets/Image/slideImg2.jpeg');
const image3 = require('../../assets/Image/slideImg4.jpeg');

// Dashboard Tab Content
const DashboardTab = () => {

    const daysData = [
        { id: '1', img: 'https://img.atlasobscura.com/txlE_UFn3Ve4hAPSAhaSj0wZtWNM8WrAcSOiWf5P_lQ/rs:fill:580:580:1/g:ce/q:81/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL3BsYWNl/X2ltYWdlcy85Y2I5/OTU3YS00YjFiLTQ0/OWItOTA1My00ZTg4/OTQwNzM2MzdhNTdm/NzA5OGVlYTQ0ZWFh/ZmRfRUg5NkNSLmpw/Zw.jpg', title: "Social Media" },
        { id: '2', img: 'https://t4.ftcdn.net/jpg/00/61/06/27/360_F_61062796_NF87GPnWV0fQ2LhoYNlyjev0PocRwZj9.jpg', title: "Temple Bank" },
        { id: '3', img: 'https://i.pinimg.com/736x/a9/20/0d/a9200d2079ff66d583f09d59263feeb8.jpg', title: "Temple Trust" },
        { id: '4', img: 'https://www.theindiatourism.com/images/Orissa-fair.jpg', title: "Temple Festival" },
        { id: '5', img: 'https://thumbs.dreamstime.com/b/news-woodn-dice-depicting-letters-bundle-small-newspapers-leaning-left-dice-34802664.jpg', title: "Temple News" },
        { id: '6', img: 'https://image.wedmegood.com/resized-nw/600X/wp-content/uploads/2021/01/zowed.jpg', title: "Temple Mandap" },
        { id: '7', img: 'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/d84cd595-fd49-44f5-811b-e6884eabfada/0a87bae5-51af-4bf3-b1b9-170047b906e9.png', title: "Temple Pooja" },
        { id: '8', img: 'https://static.toiimg.com/photo/76564085.cms', title: "Temple Prasad" },
        { id: '9', img: 'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/5cb0d687-69f2-4301-939d-07ee3a94a2c8/b1c40ea9-cba2-440b-b053-64c275a37627.png', title: "Temple Ritual" },
    ];

    const templeData = [
        {
            id: '1',
            name: 'Lorem Ipsum',
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeztqkLnFw-5uXQPjs1Ane-IaX9cjY8kfj5A&s", // replace with your image path
        },
        {
            id: '2',
            name: 'Lorem Ipsum',
            image: "https://admin.stayatpurijagannatha.in/images/frontend/main-slider-1_1670308972.jpg", // replace with your image path
        },
        {
            id: '3',
            name: 'Lorem Ipsum',
            image: "https://www.tripsavvy.com/thmb/CqvMyrnnVy5fNLFYTr5zW13s-XE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/_DSC0713_Snapseed_Darkroom-819d0b229974460e8141622c4494e2ed.jpg", // replace with your image path
        },
        {
            id: '4',
            name: 'Lorem Ipsum',
            image: "https://media.istockphoto.com/id/1355441785/photo/main-temple-dome-of-jagannath-temple-a-famous-hindu-temple-dedicated-to-jagannath-or-lord.jpg?s=612x612&w=0&k=20&c=Hq7m_EcFY0dzlVnTryx5K8OmBpHyBCNDzBCfOew-jVk=", // replace with your image path
        },
        {
            id: '5',
            name: 'Lorem Ipsum',
            image: "https://www.thomascook.in/blog/wp-content/uploads/2024/06/jagannath-puri-temple.jpg", // replace with your image path
        },
        {
            id: '6',
            name: 'Lorem Ipsum',
            image: "https://www.mypuritour.com/wp-content/uploads/2022/08/puri-tour-2022.jpeg", // replace with your image path
        },
    ];

    const serviceDate = [
        { id: 1, lable: 'Darshan', image: 'https://thetempleguru.com/wp-content/uploads/2023/04/Jagannath-temple-7.jpg' },
        { id: 2, lable: 'Prasad', image: 'https://www.localguidesconnect.com/t5/image/serverpage/image-id/975932i39EFDAEF370716D6?v=v2' },
        { id: 3, lable: 'Festival', image: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/jagannath-temple-in-puri-heritage.jpg' },
        { id: 4, lable: 'Ritual', image: 'https://i.pinimg.com/736x/bc/2e/31/bc2e3178e1b4cb6d9a825824fbee9507.jpg' },
    ]

    const images = [image1, image2, image3];

    const renderDayItem = ({ item }) => (
        <TouchableOpacity style={styles.dayCard}>
            {/* <Text style={styles.dayCardText}>{item.day}</Text> */}
            <Image style={{ width: '100%', height: 60, borderRadius: 20 }} source={{ uri: item.img }} />
            <Text style={styles.dayCardText}>{item.title}</Text>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.name}</Text>
            </View>
        </View>
    );

    const renderServiceItem = ({ item }) => {
        return (
            <View style={styles.serviceItem}>
                <Image style={{ width: '100%', height: '100%', borderRadius: 10 }} source={{ uri: item.image }} />
                <Text style={styles.serviceLable}>{item.lable}</Text>
            </View>
        )
    }

    return (
        <ScrollView style={styles.dashboardContainer}>
            <View style={{ marginTop: 10 }}>
                <FlatList
                    data={daysData}
                    renderItem={renderDayItem}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
            <View style={styles.swiperContainer}>
                <Swiper
                    showsButtons={false}
                    autoplay={false}
                    autoplayTimeout={3}
                    dotStyle={styles.dotStyle}
                    activeDotStyle={styles.activeDotStyle}
                    paginationStyle={{ bottom: 10 }}
                >
                    {images.map((image, index) => (
                        <Image
                            key={index}
                            source={image}  // Use local image source
                            style={styles.sliderImage}
                            resizeMode="cover"
                        />
                    ))}
                </Swiper>
            </View>
            <View style={{ marginTop: 35 }}>
                <Text style={{ color: "#000", fontWeight: '700', fontSize: 17, marginLeft: 10, marginBottom: 5 }}>Main Temple</Text>
                <FlatList
                    data={templeData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
            <View style={{ marginTop: 30 }}>
                <Text style={{ color: "#000", fontWeight: '700', fontSize: 17, marginLeft: 10, marginBottom: 5 }}>Devotee Services</Text>
                <FlatList
                    data={serviceDate}
                    renderItem={renderServiceItem}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    contentContainerStyle={styles.serviceListContainer}
                />
            </View>
        </ScrollView>
    );
}

// Calendar Tab Content
const CalendarTab = () => {

    const [selectedDate, setSelectedDate] = useState('');

    const handleDayPress = (day) => {
        setSelectedDate(day.dateString);
        console.log('Selected day', day);
    };

    return (
        <View style={styles.calendarContainer}>
            <Calendar
                // Current date
                current={new Date().toISOString().split('T')[0]}
                // Mark selected date
                markedDates={{
                    [selectedDate]: { selected: true, selectedColor: '#4caf50', selectedTextColor: '#fff' },
                    '2024-10-15': { marked: true, dotColor: '#ff5722' },
                    '2024-10-20': { marked: true, dotColor: '#4caf50' },
                }}
                // Customize day and month titles
                theme={{
                    backgroundColor: '#f0f0f0',
                    calendarBackground: '#fff',
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: '#4caf50',
                    selectedDayTextColor: '#fff',
                    todayTextColor: '#ff5722',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    monthTextColor: '#4caf50',
                    arrowColor: '#4caf50',
                    textDayFontFamily: 'Roboto',
                    textMonthFontFamily: 'Roboto',
                    textDayHeaderFontFamily: 'Roboto',
                    textDayFontWeight: '300',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '500',
                    textDayFontSize: 16,
                    textMonthFontSize: 20,
                    textDayHeaderFontSize: 14,
                }}
                // Handle day press
                onDayPress={handleDayPress}
                // Enable swipe between months
                enableSwipeMonths={true}
                // Hide extra days
                hideExtraDays={true}
                // Show arrows with custom colors
                hideArrows={false}
            />
        </View>
    );
}

const Index = (props) => {
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const openModal = () => { setModalVisible(true) };
    const closeModal = () => { setModalVisible(false) };

    // State for Tab View
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'dashboard', title: 'Dashboard' },
        { key: 'calendar', title: 'Calendar' },
    ]);

    // Render the content of each tab
    const renderScene = SceneMap({
        dashboard: DashboardTab,
        calendar: CalendarTab,
    });

    // Custom TabBar for improved design
    const renderTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle={styles.indicator}
            style={styles.tabBar}
            labelStyle={styles.tabLabel}
            activeColor="#004d40"  // Active color for tab
            inactiveColor="#757575"  // Inactive color for tab
        />
    );

    return (
        <View style={styles.container}>
            {/* Modal for Drawer */}
            <DrawerModal visible={isModalVisible} navigation={navigation} onClose={closeModal} />

            {/* Header */}
            <View style={styles.headerPart}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: 'red', fontSize: 20, fontWeight: 'bold', textTransform: 'capitalize', textShadowColor: '#000', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2, marginLeft: 8 }}>Nilakantheswar temple</Text>
                    <MaterialCommunityIcons name="hands-pray" color={'red'} size={25} style={{ textTransform: 'capitalize', textShadowColor: '#000', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2, }} />
                </View>
                <TouchableOpacity onPress={openModal} style={{ marginLeft: 8 }}>
                    <Octicons name="three-bars" color={'#000'} size={28} />
                </TouchableOpacity>
            </View>

            {/* Tab View */}
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={renderTabBar}
                initialLayout={{ width }}
                style={styles.tabView}
                swipeEnabled={false}
            />

            <View style={{ padding: 0, height: 58, borderRadius: 0, backgroundColor: '#fff', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', margin: 0 }}>
                    <View style={{ padding: 0, width: '25%' }}>
                        <View activeOpacity={0.6} underlayColor="#DDDDDD" style={{ backgroundColor: '#fff', padding: 10, flexDirection: 'column', alignItems: 'center' }}>
                            <View style={{ alignItems: 'center' }}>
                                <Octicons name="home" color={'#dc3545'} size={21} />
                                <Text style={{ color: '#dc3545', fontSize: 11, fontWeight: '500', marginTop: 4, height: 17 }}>Home</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ padding: 0, width: '25%' }}>
                        <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" style={{ backgroundColor: '#fff', padding: 10, flexDirection: 'column', alignItems: 'center' }}>
                            <View style={{ alignItems: 'center' }}>
                                <MaterialCommunityIcons name="finance" color={'#000'} size={23} />
                                <Text style={{ color: '#000', fontSize: 11, fontWeight: '500', marginTop: 4, height: 17 }}>Finance</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    {/* <View style={{ padding: 0, width: '23%' }}>
                        <View style={{ backgroundColor: '#fff', padding: 8, height: 90, flexDirection: 'column', alignItems: 'center', bottom: 25, borderRadius: 100 }}>
                            <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" style={{ backgroundColor: '#dc3545', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 60 }}>
                                <MaterialCommunityIcons style={{}} name="podcast" color={'#fff'} size={40} />
                            </TouchableHighlight>
                        </View>
                    </View> */}
                    <View style={{ padding: 0, width: '25%' }}>
                        <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" style={{ backgroundColor: '#fff', padding: 10, flexDirection: 'column', alignItems: 'center' }}>
                            <View style={{ alignItems: 'center' }}>
                                <MaterialIcons name="work-history" color={'#000'} size={22} />
                                <Text style={{ color: '#000', fontSize: 11, fontWeight: '500', marginTop: 4, height: 17 }}>Booking</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={{ padding: 0, width: '25%' }}>
                        <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" style={{ backgroundColor: '#fff', padding: 10, flexDirection: 'column', alignItems: 'center' }}>
                            <View style={{ alignItems: 'center', marginTop: 3 }}>
                                <Fontisto name="date" color={'#000'} size={20} />
                                <Text style={{ color: '#000', fontSize: 11, fontWeight: '500', marginTop: 4, height: 17 }}>Panji</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    headerPart: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingLeft: 5,
        paddingRight: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 13,
        elevation: 5,
    },
    dashboardContainer: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        padding: 10
    },
    calendarContainer: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        // justifyContent: 'center',
        paddingTop: 10,
    },
    tabText: {
        fontSize: 20,
        color: '#333',
    },
    tabView: {
        marginTop: 5,
    },
    tabBar: {
        backgroundColor: '#fff',
        elevation: 2,
    },
    indicator: {
        backgroundColor: '#004d40',
        height: 3,
    },
    tabLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    listContainer: {
        justifyContent: 'center',
    },
    card: {
        width: 115,
        height: 140,
        margin: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#808080',
        padding: 2,
        backgroundColor: '#ede4e4'
    },
    image: {
        width: '100%',
        height: 90,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
        // resizeMode: 'cover'
    },
    cardContent: {
        padding: 10,
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    dayCard: {
        // borderRadius: 50,
        marginHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center',
        // elevation: 2, // Shadow for Android
        width: 60, // Fixed width for each item
        // height: 80, // Fixed height for each item
    },
    dayCardText: {
        marginTop: 2,
        fontSize: 13,
        fontWeight: '400',
        color: '#424242', // Text color
    },
    swiperContainer: {
        // backgroundColor: 'red',
        borderRadius: 10,
        marginTop: 30,
        overflow: 'hidden', // Ensures child elements respect border radius
        height: 160, // Set height for the Swiper
    },
    dotStyle: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        width: 10,
        height: 10,
        borderRadius: 5,
        margin: 3,
    },
    activeDotStyle: {
        backgroundColor: '#fff',
        width: 20,
        height: 10,
        borderRadius: 5,
        margin: 3,
    },
    sliderImage: {
        width: '100%', // Fill the entire Swiper container
        height: '100%', // Fill the entire Swiper container
        borderRadius: 10, // Rounded corners
    },
    serviceListContainer: {
        // backgroundColor: '#fff',
        marginBottom: 10,
    },
    serviceItem: {
        width: '50%',
        height: 140,
        // backgroundColor: 'red',
        padding: 10,
    },
    serviceLable: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 20,
        right: '40%',
        letterSpacing: 0.6
    }
});
