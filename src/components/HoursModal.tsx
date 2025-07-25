import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { HoursModalProps } from '../types/customTypes';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/AntDesign';

const HoursModal: React.FC<HoursModalProps> = ({ visible, onClose, onConfirm }) => {
    const [hours, setHours] = useState('');
    const { t } = useTranslation();

    const handleConfirm = () =>{
        if(hours.trim() != '') {
            onConfirm(hours);
            setHours('');
        }
    };

    return (
        <Modal visible={visible} animationType='fade' transparent>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>{t('hoursPlayedAlertTitle')}</Text>
                    <TextInput 
                        style={styles.input}
                        keyboardType='numeric'
                        value={hours}
                        onChangeText={setHours}
                        placeholder={t('hoursModalInputPlaceholder')}
                    />
                    <View style={styles.actions}>
                        <TouchableOpacity style={[styles.button, styles.cancel]} onPress={onClose}>
                            <Icon name='close' size={32} color='#E16359' />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.confirm]} onPress={handleConfirm}>
                            <Icon name='check' size={32} color='#57e263ff' />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancel: {
    backgroundColor: 'white',
  },
  confirm: {
    backgroundColor: 'white',
  }
});

export default HoursModal;