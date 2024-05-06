// GroupChat.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createGroup, fetchUsers } from '../../model/Group.model';

const GroupChat = () => {
  const [users, setUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [groupId, setGroupId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUsersData = async () => {
      const userData = await fetchUsers();
      setUsers(userData);
    };
    fetchUsersData();
  }, []);

  const toggleMemberSelection = (userId) => {
    const isSelected = selectedMembers.includes(userId);
    if (isSelected) {
      setSelectedMembers(selectedMembers.filter(id => id !== userId));
    } else {
      setSelectedMembers([...selectedMembers, userId]);
    }
  };

  const createGroupChat = async () => {
    try {
      const newGroupId = await createGroup(groupName, selectedMembers);
      setGroupId(newGroupId);
    } catch (error) {
      console.error('Erreur lors de la création du groupe de chat :', error);
    }
  };

  if (groupId) {
    return (
      <View>
        <Text>Groupe créé avec succès !</Text>
      </View>
    );
  }

  return (
    <View>
      <TextInput
        placeholder="Nom du groupe"
        value={groupName}
        onChangeText={setGroupName}
      />
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleMemberSelection(item.id)}>
            <Text>{item.username}</Text>
          </TouchableOpacity>
        )}
      />
      <Button
        title="Créer un groupe de chat"
        onPress={createGroupChat}
      />
    </View>
  );
};

export default GroupChat;



