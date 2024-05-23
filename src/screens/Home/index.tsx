import { useState} from "react";
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { styles } from "./styles";
import { Participant } from "../../components/Participant"

export  function Home(){
  const [participants, setParticipants] = useState<string[]>([])
  const [ participantName, setParticipantName ] = useState('')

    
    const handleParticipantAdd = () => {
      if(participants.includes(participantName)) {
        return Alert.alert('Participante Existe', 'Esse participante já existe na lista')
      }
      setParticipants([...participants, participantName])
      setParticipantName('')
    }

    const handleParticipantRemove = (name: string) => {
      Alert.alert("Remover", `Deseja remover o participante ${name}?`, [
        {
          text: 'Sim',
          onPress: () => Alert.alert('Deletado', `O participante ${name} foi deletado.`)
        },
        {
          text: 'Não',
          style: 'cancel'
        }
      ])
    }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do Evento</Text>

      <Text style={styles.eventDate}>Terça, 21 Maio de 2024</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do Participante"
          placeholderTextColor="#6B6B6B"
          keyboardType="email-address"
          onChangeText={setParticipantName}
          value={participantName}
        />
        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}> + </Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={participants}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmpty}>Lista vazia, adicione participantes a sua lista de presença</Text>
        )}
      />

    </View>
  );
}