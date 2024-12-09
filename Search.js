import React, { useState } from "react";
import {  StyleSheet,  View,  Text,  TouchableOpacity,  FlatList,  Dimensions, ScrollView, Alert } from "react-native";
import moment from "moment";

export default function WeeklyCalendar() {
  const [currentDate, setCurrentDate] = useState(moment().format("YYYY-MM-DD"));
  const [weekStart, setWeekStart] = useState(moment().startOf("week"));
  const [selectedDate, setSelectedDate] = useState(currentDate);
  
  // Sample bookings data - in a real app, this would come from an API/database
  const [bookings, setBookings] = useState([
    {
      id: '1',
      date: moment().format("YYYY-MM-DD"),
      time: '10:00 AM',
      service: 'Haircut',
      status: 'confirmed'
    },
    {
      id: '2',
      date: moment().add(1, 'days').format("YYYY-MM-DD"),
      time: '2:30 PM',
      service: 'Massage',
      status: 'confirmed'
    }
  ]);

  // Generate week days
  const generateWeek = (startOfWeek) => {
    return Array.from({ length: 7 }, (_, i) =>
      moment(startOfWeek).add(i, "days").format("YYYY-MM-DD")
    );
  };

  // Change week
  const changeWeek = (direction) => {
    const newStart = moment(weekStart).add(direction * 7, "days");
    setWeekStart(newStart);
  };

  // Handle booking cancellation
  const handleCancelBooking = (bookingId) => {
    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel this booking?",
      [
        {
          text: "No",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => {
            setBookings(bookings.filter(booking => booking.id !== bookingId));
          }
        }
      ]
    );
  };

  // Render each day
  const renderDay = ({ item }) => {
    const isToday = item === currentDate;
    const isSelected = item === selectedDate;
    const hasBookings = bookings.some(booking => booking.date === item);

    return (
      <TouchableOpacity
        style={[
          styles.dayContainer,
          isToday && styles.todayContainer,
          isSelected && styles.selectedContainer,
          hasBookings && styles.hasBookingsContainer
        ]}
        onPress={() => setSelectedDate(item)}
      >
        <Text style={[styles.dayText, (isToday || isSelected) && styles.todayText]}>
          {moment(item).format("ddd")}
        </Text>
        <Text style={[styles.dateText, (isToday || isSelected) && styles.todayText]}>
          {moment(item).format("D")}
        </Text>
        {hasBookings && (
          <View style={styles.bookingDot} />
        )}
      </TouchableOpacity>
    );
  };

  // Render booking item
  const renderBooking = ({ item }) => (
    <View style={styles.bookingItem}>
      <View style={styles.bookingInfo}>
        <Text style={styles.bookingTime}>{item.time}</Text>
        <Text style={styles.bookingService}>{item.service}</Text>
        <Text style={styles.bookingStatus}>{item.status}</Text>
      </View>
      <TouchableOpacity 
        style={styles.cancelButton}
        onPress={() => handleCancelBooking(item.id)}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Bookings</Text>
          <View style={styles.monthContainer}>
            <TouchableOpacity onPress={() => changeWeek(-1)}>
              <Text style={styles.arrow}>{"<"}</Text>
            </TouchableOpacity>
            <Text style={styles.monthText}>
              {moment(weekStart).format("MMMM YYYY")}
            </Text>
            <TouchableOpacity onPress={() => changeWeek(1)}>
              <Text style={styles.arrow}>{">"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Calendar Section */}
        <FlatList
          horizontal
          data={generateWeek(weekStart)}
          renderItem={renderDay}
          keyExtractor={item => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.weekList}
        />
      </View>

      {/* Bookings Section */}
      <View style={styles.bookingsContainer}>
        <Text style={styles.bookingsTitle}>
          Bookings for {moment(selectedDate).format("MMM D, YYYY")}
        </Text>
        <FlatList
          data={bookings.filter(booking => booking.date === selectedDate)}
          renderItem={renderBooking}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <Text style={styles.noBookingsText}>No bookings for this date</Text>
          }
        />
      </View>
    </ScrollView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5"
  },
  container: {
    backgroundColor: "#2E7D32",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    padding: 16,
    paddingBottom: 30,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 15
  },
  monthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  },
  monthText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFF"
  },
  arrow: {
    fontSize: 24,
    color: "#FFF",
    paddingHorizontal: 10
  },
  weekList: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  dayContainer: {     
    alignItems: "center",     
    justifyContent: "center",     
    paddingVertical: 8,    
    width: width / 7 - 10, // Divide screen width by 7 days, adjust for padding    
    borderRadius: 8,     
    backgroundColor: "#2E7D32"
  },
  todayContainer: {
    backgroundColor: "#1B5E20"
  },
  selectedContainer: {
    backgroundColor: "#43A047"
  },
  dayText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000"
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginTop: 4
  },
  todayText: {
    color: "#FFF"
  },
  bookingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FFD700",
    marginTop: 4
  },
  bookingsContainer: {
    padding: 20
  },
  bookingsTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15
  },
  bookingItem: {
    flexDirection: 'row',
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  bookingInfo: {
    flex: 1
  },
  bookingTime: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4
  },
  bookingService: {
    fontSize: 14,
    color: "#666"
  },
  bookingStatus: {
    fontSize: 12,
    color: "#43A047",
    marginTop: 4
  },
  cancelButton: {
    backgroundColor: "#FF5252",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8
  },
  cancelButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600"
  },
  noBookingsText: {
    textAlign: 'center',
    color: "#666",
    fontSize: 16,
    marginTop: 20
  }
});