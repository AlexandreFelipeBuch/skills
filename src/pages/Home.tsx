import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList,
} from 'react-native';
import {Buttom} from '../components/Buttom';
import {SkillCard} from '../components/SkillCard';

interface SkillData {
  id: String;
  name: String;
}

export function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [greetings, setGreetings] = useState('');

  const handleAddNewSkill = () => {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill,
    };
    setMySkills(oldState => [...oldState, data]);
  };
  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreetings('Bom dia');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreetings('Boa tarde');
    } else {
      setGreetings('Boa noite');
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greetings}>{greetings}</Text>
      <Text style={styles.title}>Bem vindo, Felipe</Text>
      <TextInput
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor={'#555'}
        onChangeText={setNewSkill}
      />
      <Buttom onPress={handleAddNewSkill} />
      <Text style={[styles.title, {marginVertical: 50}]}>My Skills</Text>

      <FlatList
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({item}) => <SkillCard skill={item.name} />}
      />
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingVertical: 70,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
  },
  input: {
    backgroundColor: '#1F1E25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 10,
  },
  greetings: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
  },
});
