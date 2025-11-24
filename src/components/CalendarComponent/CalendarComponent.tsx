import React, { useEffect, useState } from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import moment from 'moment';
import DatePicker from 'react-native-styled-datepicker';
import { height, moderateScale, width } from '../../constant/responsiveStyle';
import { YYYY_MM_DD } from '../../constant/dateFormatConstants';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';
import { CrossIcon } from '../../assets';
import colors from '../../constant/colors';
import { CalendarWithList } from './classCalendar';
const CalenderCloseButton = ({ onPress }) => {
  return (
    <View style={styles.closeIconStyle}>
      <Text />
      <TouchableOpacity onPress={onPress}>
        <CrossIcon
          width={`${moderateScale(16)}`}
          height={`${moderateScale(17)}`}
          style={{ margin: 9 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const DISABLED_DAYS = ['Saturday', 'Sunday'];

interface CalendarComponentProps {
  setShowCalender?: any;
  visibility: boolean;
  minDate?: any;
  maxDate?: any;
  currentDate?: any;
  onSelectDate?: (date: any, index?: any) => void;
  dateMessage?: any;
  sipData?: any;
  isStartCaledar?: any;
  frequency?: any;
  isDateOfBirthPicker?: boolean;
  isTodayDisable?: boolean;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  setShowCalender,
  visibility,
  minDate,
  maxDate,
  currentDate,
  onSelectDate,
  dateMessage,
  sipData,
  isStartCaledar,
  frequency,
  isDateOfBirthPicker,
  isTodayDisable = false,
}: any) => {
  const [state, setState] = useState<any>();
  const [perDate, setPerDate] = useState<any>();
  useEffect(() => {
    if (perDate == 'Invalid date') return;
    setPerDate(moment(currentDate).format(YYYY_MM_DD));
    console.log(
      'currentDate and perDate',
      currentDate,
      perDate,
      moment(currentDate, 'DD-MMM-YYYY').format(YYYY_MM_DD),
    );
  }, [currentDate]);

  const [startDateState, setStartDateState] = useState<any>();

  const disableForDailyFreq = (
    month: any,
    year: any,
    days: any,
    includeHolidays = true,
  ) => {
    let start: any = moment().month(month).year(year).startOf('month');
    const end: any = moment().month(month).year(year).endOf('month');
    let dates: any = {};
    let holidaysList: any = [];
    holidaysList = [];
    while (start.isBefore(end)) {
      if (
        start > moment(minDate) &&
        start < moment(maxDate) &&
        start.day() != 0 &&
        start.day() != 6 &&
        start.date() != 31 &&
        (holidaysList?.length > 0
          ? !holidaysList?.includes(start?.format('DD-MM-YYYY'))
          : true)
      ) {
        dates[start.format('YYYY-MM-DD')] = { disabled: false };
      } else {
        dates[start.format('YYYY-MM-DD')] = { disabled: true };
      }
      start.add(1, 'days');
    }
    return dates;
  };

  const disableForWeeklyFreq = (month: any, year: any) => {
    try {
      let start: any = moment().month(month).year(year).startOf('month');
      let end: any = moment().month(month).year(year).endOf('month');
      let dates: any = {};
      while (start.isBefore(end)) {
        if (
          start >= moment(minDate).subtract(1, 'd') &&
          start < moment(maxDate) &&
          (start.date() == 1 ||
            start.date() == 8 ||
            start.date() == 15 ||
            start.date() == 22)
        ) {
          dates[start.format('YYYY-MM-DD')] = { disabled: false };
        } else {
          dates[start.format('YYYY-MM-DD')] = { disabled: true };
        }
        start.add(1, 'days');
      }
      return dates;
    } catch (error) {}
  };

  const disableForWeekDayFreq = (month: any, year: any) => {
    try {
      let start: any = moment().month(month).year(year).startOf('month');
      let end: any = moment().month(month).year(year).endOf('month');
      let dates: any = {};
      while (start.isBefore(end)) {
        if (
          start >= moment(minDate).subtract(1, 'd') &&
          start < moment(maxDate) &&
          start.day() == moment(sipData?.date).day()
        ) {
          dates[start.format('YYYY-MM-DD')] = { disabled: false };
        } else {
          dates[start.format('YYYY-MM-DD')] = { disabled: true };
        }
        start.add(1, 'days');
      }
      return dates;
    } catch (error) {}
  };

  const disableForMonthFreq = (month: any, year: any) => {
    try {
      let start: any = moment().month(month).year(year).startOf('month');
      let end: any = moment().month(month).year(year).endOf('month');
      let dates: any = {};
      while (start.isBefore(end)) {
        if (
          start >= moment(minDate).subtract(1, 'd') &&
          start < moment(maxDate) &&
          start.date() == moment(sipData?.date).date()
        ) {
          dates[start.format('YYYY-MM-DD')] = { disabled: false };
        } else {
          dates[start.format('YYYY-MM-DD')] = { disabled: true };
        }
        start.add(1, 'days');
      }
      return dates;
    } catch (error) {}
  };

  const disableForQaterlyFreq = (month: any, year: any) => {
    try {
      let start: any = moment().month(month).year(year).startOf('month');
      let end: any = moment().month(month).year(year).endOf('month');
      let dates: any = {};
      while (start.isBefore(end)) {
        if (
          start >= moment(minDate).subtract(1, 'd') &&
          start < moment(maxDate) &&
          moment(sipData?.date).date() == start.date() &&
          start.diff(moment(sipData?.date), 'months') % 3 == 0
        ) {
          dates[start.format('YYYY-MM-DD')] = { disabled: false };
        } else {
          dates[start.format('YYYY-MM-DD')] = { disabled: true };
        }
        start.add(1, 'days');
      }
      return dates;
    } catch (error) {}
  };

  const disableForHalfYearlyFreq = (month: any, year: any) => {
    try {
      let start: any = moment().month(month).year(year).startOf('month');
      let end: any = moment().month(month).year(year).endOf('month');
      let dates: any = {};
      while (start.isBefore(end)) {
        if (
          start >= moment(minDate).subtract(1, 'd') &&
          start < moment(maxDate) &&
          moment(sipData?.date).date() == start.date() &&
          start.diff(moment(sipData?.date), 'months') % 6 == 0
        ) {
          dates[start.format('YYYY-MM-DD')] = { disabled: false };
        } else {
          dates[start.format('YYYY-MM-DD')] = { disabled: true };
        }
        start.add(1, 'days');
      }
      return dates;
    } catch (error) {}
  };

  const disableForYearlyFreq = (month: any, year: any) => {
    try {
      let start: any = moment().month(month).year(year).startOf('month');
      let end: any = moment().month(month).year(year).endOf('month');
      let dates: any = {};
      while (start.isBefore(end)) {
        if (
          start >= moment(minDate).subtract(1, 'd') &&
          start < moment(maxDate) &&
          moment(sipData?.date).date() == start.date() &&
          start.diff(moment(sipData?.date), 'months') % 12 == 0
        ) {
          dates[start.format('YYYY-MM-DD')] = { disabled: false };
        } else {
          dates[start.format('YYYY-MM-DD')] = { disabled: true };
        }
        start.add(1, 'days');
      }
      return dates;
    } catch (error) {}
  };

  const disableThirtyFirst = (month: any, year: any) => {
    try {
      let start: any = moment().month(month).year(year).startOf('month');
      let end: any = moment().month(month).year(year).endOf('month');
      let dates: any = {};
      while (start.isBefore(end)) {
        if (
          start > moment(minDate) &&
          start < moment(maxDate) &&
          start.date() != 31
        ) {
          dates[start.format('YYYY-MM-DD')] = { disabled: false };
        } else {
          dates[start.format('YYYY-MM-DD')] = { disabled: true };
        }
        start.add(1, 'days');
      }
      return dates;
    } catch (error) {}
  };

  const onMonthChange = (date: any) => {
    switch (sipData?.sipFrequency?.toLowerCase()) {
      case 'wd':
      case 'fw':
        setState({
          markedDates: disableForWeeklyFreq(date.month - 1, date.year),
        });
        break;
      case 'om':
      case 'fm':
      case 'm':
        setState({
          markedDates: disableForMonthFreq(date.month - 1, date.year),
        });
        break;
      case 'q':
      case 'fq':
        setState({
          markedDates: disableForQaterlyFreq(date.month - 1, date.year),
        });
        break;
      case 'fd':
      case 'dz':
        setState({
          markedDates: disableForDailyFreq(
            date.month - 1,
            date.year,
            DISABLED_DAYS,
          ),
        });
        break;
      case 'hy':
      case 'h':
      case 'fh':
        setState({
          markedDates: disableForHalfYearlyFreq(date.month - 1, date.year),
        });
        break;
      case 'y':
      case 'fy':
        setState({
          markedDates: disableForYearlyFreq(date.month - 1, date.year),
        });
        break;
      case 'ow':
        setState({
          markedDates: disableForWeekDayFreq(date.month - 1, date.year),
        });
        break;
      default:
        return undefined;
    }
  };

  const monthChangeForStartCalendar = (date: any) => {
    try {
      switch (frequency?.toLowerCase()) {
        case 'fd':
        case 'dz':
          setStartDateState({
            markedDates: disableForDailyFreq(
              date.month - 1,
              date.year,
              DISABLED_DAYS,
            ),
          });
          break;
        case 'wd':
        case 'fw':
          // case "ow":
          setStartDateState({
            markedDates: disableForWeeklyFreq(date.month - 1, date.year),
          });
          break;
        case 'om':
        case 'fm':
        case 'q':
        case 'fq':
        case 'hy':
        case 'h':
        case 'fh':
        case 'y':
        case 'fy':
          setStartDateState({
            markedDates: disableThirtyFirst(date.month - 1, date.year),
          });
          break;
        case 'ow':
          setStartDateState({
            markedDates: disableForDailyFreq(
              date.month - 1,
              date.year,
              DISABLED_DAYS,
              false,
            ),
          });
          break;
        default:
          return undefined;
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (sipData)
      onMonthChange({
        date: moment(currentDate).format(YYYY_MM_DD),
        year: moment(currentDate).format('YYYY'),
        month: moment(currentDate).month() + 1,
      });
  }, [sipData]);

  useEffect(() => {
    if (isStartCaledar && frequency) {
      monthChangeForStartCalendar({
        date: moment(currentDate).format(YYYY_MM_DD),
        year: moment(currentDate).format('YYYY'),
        month: moment(currentDate).month() + 1,
      });
    }
  }, [isStartCaledar, frequency]);

  const [firstRun, setFirstRun] = useState(true);

  const [storeRef, setStoreRef] = useState<any>('');

  useEffect(() => {
    if (
      firstRun &&
      startDateState?.markedDates &&
      isStartCaledar &&
      frequency &&
      storeRef
    ) {
      let changeCurrent = true;
      for (const property in startDateState?.markedDates) {
        if (!startDateState?.markedDates?.[property]?.disabled) {
          changeCurrent = false;
          break;
        }
      }
      if (changeCurrent) {
        storeRef?.current?.addMonth(1);
      }
      setFirstRun(false);
    }
  }, [startDateState?.markedDates, isStartCaledar, frequency, storeRef]);

  function checkSameMonthAndYear(date1: string, date2: string) {
    const firstDate = moment(date1);
    const secondDate = moment(date2);

    const isSameMonthAndYear =
      firstDate.add(2, 'days').isSame(secondDate, 'month') &&
      firstDate.isSame(secondDate, 'year');

    return isSameMonthAndYear;
  }

  return (
    console.log(
      'perDateperDate',
      perDate,
      currentDate,
      moment(currentDate, 'DD-MMM-YYYY').format(YYYY_MM_DD),
    ),
    (
      <Modal visible={visibility} transparent={true} animationType={'fade'}>
        <TouchableWithoutFeedback
          onPress={() => {
            setShowCalender(false);
            setPerDate(
              moment(moment(currentDate, 'DD-MMM-YYYY').toDate()).format(
                'YYYY-MM-DD',
              ),
            );
          }}
        >
          <View style={styles.container}>
            <TouchableOpacity
              activeOpacity={1}
              style={[
                styles.calenderContainer,
                !isDateOfBirthPicker && {
                  minHeight: height / 2.5,
                  maxHeight:
                    Platform.OS === 'android' ? height * 0.7 : height * 0.6,
                },
                isDateOfBirthPicker && {
                  paddingVertical: moderateScale(16),
                },
                {
                  alignItems: 'center',
                  width: width - moderateScale(20),
                  padding: moderateScale(isDateOfBirthPicker ? 10 : 20),
                },
              ]}
            >
              {false ? (
                <CalendarWithList
                  minDate={minDate}
                  maxDate={maxDate}
                  onDayPress={onSelectDate}
                  current={new Date(currentDate)}
                  onMonthChange={
                    sipData
                      ? onMonthChange
                      : isStartCaledar
                      ? monthChangeForStartCalendar
                      : undefined
                  }
                  markedDates={
                    sipData
                      ? state?.markedDates
                      : isStartCaledar
                      ? startDateState?.markedDates
                      : undefined
                  }
                  disableAllTouchEventsForDisabledDays={true}
                  setStoreRef={setStoreRef}
                />
              ) : (
                <View style={{ width: '100%' }}>
                  {isDateOfBirthPicker && (
                    <CalenderCloseButton
                      onPress={() => {
                        setShowCalender(false);
                        setPerDate(
                          moment(
                            moment(currentDate, 'DD-MMM-YYYY').toDate(),
                          ).format('YYYY-MM-DD'),
                        );
                      }}
                    />
                  )}
                  {/* <DatePicker
                    minDate={
                      minDate
                        ? moment(
                            moment(minDate, 'DD-MMM-YYYY').toDate(),
                          ).format('YYYY-MM-DD')
                        : null
                    }
                    maxDate={
                      maxDate
                        ? moment(
                            moment(maxDate, 'DD-MMM-YYYY').toDate(),
                          ).format('YYYY-MM-DD')
                        : perDate
                        ? perDate
                        : moment(currentDate, 'DD-MMM-YYYY').toDate()
                    }
                    // maxDate={maxDate}
                    selectedDateStyles={{
                      backgroundColor: colors.themeColor,
                      borderColor: colors.themeColor,
                    }}
                    monthWrapperStyles={{
                      borderRadius: moderateScale(5),
                    }}
                    selectedMonthWrapperStyles={{
                      backgroundColor: colors.themeColor,
                    }}
                    selectedYearWrapperStyles={{
                      backgroundColor: colors.themeColor,
                    }}
                    initialViewDate={
                      perDate !== 'Invalid date'
                        ? moment(currentDate, 'DD-MMM-YYYY').format(YYYY_MM_DD)
                        : currentDate
                        ? moment(currentDate, 'DD-MMM-YYYY').format(YYYY_MM_DD)
                        : perDate
                    }
                    initialSelectedDate={
                      perDate !== 'Invalid date'
                        ? moment(currentDate, 'DD-MMM-YYYY').format(YYYY_MM_DD)
                        : currentDate
                        ? moment(currentDate, 'DD-MMM-YYYY').format(YYYY_MM_DD)
                        : perDate
                    }
                    isTodayDisable={isTodayDisable}
                    onChange={(date: any) => {
                      console.log('date setPerDate', date);
                      setPerDate(date);
                    }}
                    weekendDateColor={'black'}
                  /> */}
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      marginVertical: moderateScale(4),
                      justifyContent: 'space-around',
                      marginTop: moderateScale(26),
                    }}
                  >
                    <CalendarControl
                      title={'Select'}
                      onPress={() => {
                        if (perDate) {
                          onSelectDate({
                            dateString:
                              perDate === 'Invalid date'
                                ? moment(currentDate, 'DD-MMM-YYYY').format(
                                    YYYY_MM_DD,
                                  )
                                : perDate,
                          });
                        }
                        setShowCalender(false);
                      }}
                    />
                    {/* <CalendarControl title="Close" onPress={() => {
                    setShowCalender(false)
                    setPerDate(moment(moment(currentDate, "DD-MMM-YYYY").toDate()).format("YYYY-MM-DD"))
                  }} /> */}
                  </View>
                </View>
              )}

              {dateMessage ? (
                <Text style={styles.invalidDateTxt}>{dateMessage}</Text>
              ) : (
                <Text style={styles.invalidDateTxt}> </Text>
              )}
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  );
};

export const CalendarControl = ({ title, onPress }: any) => {
  return (
    <ButtonWithIcon
      TextStyle={{ fontWeight: '600', color: colors.white }}
      mainContainer={{
        width: '40%',
        backgroundColor: colors?.themeColor,
        borderWidth: moderateScale(1),
        borderColor: colors.themeColor,
        borderRadius: moderateScale(5),
        height: moderateScale(45),
      }}
      innerContainer={undefined}
      ButtonName={title?.toUpperCase()}
      onPress={onPress}
    />
  );
};

export default CalendarComponent;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000055',
  },
  calenderContainer: {
    backgroundColor: 'white',
    padding: moderateScale(20),
    borderRadius: moderateScale(10),
  },
  invalidDateTxt: {
    marginTop: moderateScale(5),
    color: 'red',
    textAlign: 'center',
  },
  closeIconStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginRight: moderateScale(8),
  },
});
