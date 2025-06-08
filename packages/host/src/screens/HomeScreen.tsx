import {NativeBottomTabScreenProps} from '@bottom-tabs/react-navigation';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  FlatList,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Avatar,
  Badge,
  IconButton,
  Searchbar,
  Snackbar,
  Surface,
  Text,
} from 'react-native-paper';
import bankingData from '../data/bankingData.json';
import {HomeStackParamList} from '../navigation/HomeNavigator';
import {TabsParamList} from '../navigation/TabsNavigator';

type Props = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList>,
  NativeBottomTabScreenProps<TabsParamList, 'HomeNavigator'>
>;

type Service = {
  id: string;
  name: string;
  icon: string;
  color: string;
  hasNotification: boolean;
};

type CommonAction = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const CommonActionButton = ({item}: {item: CommonAction}) => (
  <TouchableOpacity style={styles.actionButton}>
    <Surface style={[styles.actionIconContainer, {backgroundColor: '#E3F2FD'}]}>
      <Avatar.Icon
        size={32}
        icon={item.icon}
        style={[styles.actionIcon, {backgroundColor: item.color}]}
      />
    </Surface>
    <View style={styles.actionTextContainer}>
      <Text variant="bodySmall" style={styles.actionText} numberOfLines={2}>
        {item.name}
      </Text>
    </View>
  </TouchableOpacity>
);

type ServiceWithNav = Service & {navigateTo?: string};

type ServiceItemProps = {
  item: ServiceWithNav;
  onNavigate?: (screen: string) => void;
  onShowNotImplemented: () => void;
};

const ServiceItem = React.memo(function ServiceItem({
  item,
  onNavigate,
  onShowNotImplemented,
}: ServiceItemProps) {
  function handlePress() {
    if (!item.navigateTo || item.navigateTo.trim() === '') {
      onShowNotImplemented();
      return;
    }

    if (onNavigate) {
      onNavigate(item.navigateTo);
    }
  }

  return (
    <TouchableOpacity style={styles.serviceItem} onPress={handlePress}>
      <View style={styles.serviceIconContainer}>
        <Surface
          style={[styles.serviceIconSurface, {backgroundColor: '#F5F5F5'}]}>
          <Avatar.Icon
            size={24}
            icon={item.icon}
            style={[styles.serviceIcon, {backgroundColor: item.color}]}
          />
          {item.hasNotification && (
            <Badge size={8} style={styles.serviceBadge} />
          )}
        </Surface>
        <View style={styles.serviceTextContainer}>
          <Text
            variant="bodySmall"
            style={styles.serviceText}
            numberOfLines={2}>
            {item.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const HomeScreen = ({navigation}: Props) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const {userBalance, commonActions, superAppServices} = bankingData;

  const renderCommonAction: ListRenderItem<CommonAction> = ({item}) => (
    <CommonActionButton item={item} />
  );

  const renderService: ListRenderItem<ServiceWithNav> = ({item}) => (
    <ServiceItem
      item={item}
      onNavigate={navigation.navigate}
      onShowNotImplemented={() => setSnackbarVisible(true)}
    />
  );

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <Surface style={styles.headerSection}>
          <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
              <Text variant="bodyLarge" style={styles.greeting}>
                {userBalance.greeting},
              </Text>
              <Text variant="titleLarge" style={styles.userName}>
                {userBalance.name}
              </Text>
            </View>
            <View style={styles.headerRight}>
              <IconButton
                icon="bell-outline"
                iconColor="#fff"
                size={20}
                style={styles.notificationIcon}
              />
              <IconButton
                icon="headphones"
                iconColor="#fff"
                size={20}
                style={styles.supportIcon}
              />
              <Text variant="bodySmall" style={styles.supportText}>
                Pusat{'\n'}Bantuan
              </Text>
            </View>
          </View>

          {/* Balance Section */}
          <Surface style={styles.balanceCard}>
            <View style={styles.balanceHeader}>
              <Text variant="bodyMedium" style={styles.balanceTitle}>
                {userBalance.accountTitle}
              </Text>
              <TouchableOpacity onPress={toggleBalanceVisibility}>
                <Avatar.Icon
                  size={20}
                  icon={isBalanceVisible ? 'eye-off' : 'eye'}
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
            <Text variant="headlineSmall" style={styles.balanceAmount}>
              {isBalanceVisible
                ? formatCurrency(userBalance.mainBalance)
                : '● ● ● ● ● ●'}
            </Text>
            <TouchableOpacity style={styles.allAccountsButton}>
              <Text variant="bodyMedium" style={styles.allAccountsText}>
                {userBalance.allAccountsText}
              </Text>
              <Avatar.Icon
                size={16}
                icon="chevron-right"
                style={styles.chevronIcon}
              />
            </TouchableOpacity>
          </Surface>
        </Surface>

        {/* Common Actions */}
        <View style={styles.actionsSection}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={commonActions}
            renderItem={renderCommonAction}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.actionsContainer}
          />
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <Searchbar
            placeholder="Cari Fitur"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
            inputStyle={styles.searchInput}
            iconColor="#757575"
          />
        </View>

        {/* Super App Services Grid */}
        <View style={styles.servicesSection}>
          <FlatList
            data={superAppServices}
            renderItem={renderService}
            keyExtractor={item => item.id}
            numColumns={4}
            scrollEnabled={false}
            contentContainerStyle={styles.servicesContainer}
          />
        </View>
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: 'OK',
          onPress: () => setSnackbarVisible(false),
        }}>
        Not implemented
      </Snackbar>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerSection: {
    backgroundColor: '#4285F4',
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    color: '#fff',
    opacity: 0.9,
  },
  userName: {
    color: '#fff',
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationIcon: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    margin: 0,
  },
  supportIcon: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    margin: 0,
    marginLeft: 8,
  },
  supportText: {
    color: '#fff',
    fontSize: 10,
    textAlign: 'center',
    marginLeft: 4,
  },
  balanceCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 16,
    elevation: 0,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceTitle: {
    color: '#fff',
    opacity: 0.9,
  },
  eyeIcon: {
    backgroundColor: 'transparent',
    margin: 0,
  },
  balanceAmount: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  allAccountsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  allAccountsText: {
    color: '#fff',
    flex: 1,
  },
  chevronIcon: {
    backgroundColor: 'transparent',
    margin: 0,
  },
  actionsSection: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
    marginHorizontal: 10,
    width: 70,
    minHeight: 80,
  },
  actionIconContainer: {
    borderRadius: 16,
    padding: 8,
    marginBottom: 8,
    elevation: 0,
  },
  actionIcon: {
    margin: 0,
  },
  actionTextContainer: {
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    textAlign: 'center',
    color: '#333',
    lineHeight: 16,
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#F5F5F5',
  },
  searchBar: {
    backgroundColor: '#fff',
    elevation: 0,
    borderRadius: 8,
  },
  searchInput: {
    fontSize: 14,
  },
  servicesSection: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  servicesContainer: {
    justifyContent: 'space-between',
  },
  serviceItem: {
    flex: 1,
    maxWidth: '25%',
    padding: 8,
    minHeight: 100,
  },
  serviceIconContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  serviceIconSurface: {
    borderRadius: 12,
    padding: 12,
    elevation: 0,
    position: 'relative',
  },
  serviceIcon: {
    margin: 0,
  },
  serviceBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF5722',
  },
  serviceTextContainer: {
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  serviceText: {
    textAlign: 'center',
    color: '#333',
    fontSize: 12,
    lineHeight: 14,
  },
});

export default HomeScreen;
