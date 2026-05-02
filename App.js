import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  FlatList, StyleSheet, SafeAreaView,
  KeyboardAvoidingView, Platform, StatusBar,
  Alert, Modal
} from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Sedang');
  const [taskList, setTaskList] = useState([]);
  const [filter, setFilter] = useState('Semua');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // ADD
  const addTask = () => {
    if (task.trim() === '') {
      Alert.alert('Oops!', 'Tulis task dulu ya!');
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      text: task.trim(),
      completed: false,
      priority,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };
    setTaskList([newTask, ...taskList]);
    setTask('');
  };

  // DELETE
  const deleteTask = (id) => {
    setTaskList(taskList.filter(item => item.id !== id));
  };

  // EDIT
  const startEdit = (item) => {
    setEditingId(item.id);
    setEditText(item.text);
  };

  const saveEdit = () => {
    setTaskList(taskList.map(item =>
      item.id === editingId ? { ...item, text: editText } : item
    ));
    setEditingId(null);
  };

  // TOGGLE DONE
  const toggleComplete = (id) => {
    setTaskList(taskList.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  // FILTER
  const filteredTasks = taskList.filter(item => {
    if (filter === 'Aktif') return !item.completed;
    if (filter === 'Selesai') return item.completed;
    return true;
  });

  const completedCount = taskList.filter(t => t.completed).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.appTitle}>MyTaskList</Text>

          <View style={styles.statCard}>
            <Text style={styles.statText}>
              {completedCount} dari {taskList.length} selesai
            </Text>
            <View style={styles.progressBar}>
              <View style={[
                styles.progressFill,
                { width: taskList.length > 0 ? `${(completedCount / taskList.length) * 100}%` : '0%' }
              ]} />
            </View>
          </View>
        </View>

        {/* INPUT */}
        <View style={styles.inputSection}>
          <TextInput
            style={styles.input}
            placeholder="Tambah task..."
            placeholderTextColor="#9CA3AF"
            value={task}
            onChangeText={setTask}
          />

          <View style={styles.priorityContainer}>
            {['Tinggi', 'Sedang', 'Rendah'].map((p) => (
              <TouchableOpacity
                key={p}
                onPress={() => setPriority(p)}
                style={[styles.pBtn, priority === p && styles.pBtnActive]}
              >
                <Text style={[styles.pBtnText, priority === p && styles.pBtnTextActive]}>
                  {p}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Text style={styles.addButtonText}>Tambah</Text>
          </TouchableOpacity>
        </View>

        {/* FILTER */}
        <View style={styles.filterTab}>
          {['Semua', 'Aktif', 'Selesai'].map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setFilter(f)}
              style={filter === f && styles.filterActive}
            >
              <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* LIST */}
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listPadding}
          renderItem={({ item }) => (
            <View style={[styles.card, item.completed && styles.cardDone]}>
              <TouchableOpacity onPress={() => toggleComplete(item.id)} style={styles.checkArea}>
                <View style={[styles.circle, item.completed && styles.circleChecked]}>
                  {item.completed && <Text style={styles.checkMark}>✓</Text>}
                </View>
              </TouchableOpacity>

              <View style={styles.cardMain}>
                <Text style={[styles.taskText, item.completed && styles.taskTextDone]}>
                  {item.text}
                </Text>

                <View style={styles.badgeRow}>
                  <Text style={styles.timeText}>{item.time}</Text>
                  <View style={[
                    styles.priorityBadge,
                    {
                      backgroundColor:
                        item.priority === 'Tinggi' ? '#DC2626' :
                          item.priority === 'Sedang' ? '#F87171' : '#E5E7EB'
                    }
                  ]}>
                    <Text style={{
                      color: item.priority === 'Rendah' ? '#374151' : '#FFF',
                      fontSize: 10,
                      fontWeight: 'bold'
                    }}>
                      {item.priority}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.actionIcons}>
                <TouchableOpacity onPress={() => startEdit(item)} style={styles.iconBtn}>
                  <Text>✏️</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.iconBtn}>
                  <Text>🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyEmoji}>📋</Text>
              <Text style={styles.emptyTitle}>Belum ada task</Text>
            </View>
          }
        />

        {/* MODAL EDIT */}
        <Modal visible={editingId !== null} transparent animationType="slide">
          <View style={styles.modalBg}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Edit Task</Text>
              <TextInput style={styles.editInput} value={editText} onChangeText={setEditText} />

              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={() => setEditingId(null)} style={styles.cancelBtn}>
                  <Text>Batal</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={saveEdit} style={styles.saveBtn}>
                  <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Simpan</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// STYLE
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
  container: { flex: 1 },

  header: { padding: 25 },
  appTitle: { fontSize: 32, fontWeight: '900', color: '#DC2626' },

  statCard: {
    marginTop: 15,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 20,
    elevation: 2,
  },

  statText: { color: '#DC2626', fontWeight: 'bold', marginBottom: 8 },

  progressBar: {
    height: 8,
    backgroundColor: '#FEE2E2',
    borderRadius: 4,
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#DC2626',
  },

  inputSection: {
    padding: 20,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  input: {
    backgroundColor: '#FEE2E2',
    padding: 15,
    borderRadius: 15,
  },

  priorityContainer: { flexDirection: 'row', marginTop: 15 },

  pBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    alignItems: 'center',
    marginRight: 5,
  },

  pBtnActive: {
    backgroundColor: '#DC2626',
  },

  pBtnText: { color: '#DC2626' },
  pBtnTextActive: { color: '#FFF' },

  addButton: {
    backgroundColor: '#DC2626',
    padding: 15,
    borderRadius: 15,
    marginTop: 15,
    alignItems: 'center',
  },

  addButtonText: { color: '#FFF', fontWeight: 'bold' },

  filterTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },

  filterText: { color: '#6B7280' },
  filterTextActive: { color: '#DC2626' },

  filterActive: {
    borderBottomWidth: 2,
    borderColor: '#DC2626',
  },

  listPadding: { padding: 20 },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    marginBottom: 10,
  },

  cardDone: { opacity: 0.6 },

  checkArea: { marginRight: 10 },

  circle: {
    width: 25,
    height: 25,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
  },

  circleChecked: {
    backgroundColor: '#DC2626',
  },

  checkMark: { color: '#FFF' },

  cardMain: { flex: 1 },

  taskText: { fontSize: 16, color: '#111827' },
  taskTextDone: { textDecorationLine: 'line-through', color: '#9CA3AF' },

  badgeRow: { flexDirection: 'row', marginTop: 5 },

  timeText: { fontSize: 11, color: '#6B7280', marginRight: 10 },

  priorityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
  },

  actionIcons: { flexDirection: 'row' },

  iconBtn: { padding: 5 },

  emptyContainer: { alignItems: 'center', marginTop: 50 },
  emptyEmoji: { fontSize: 40 },
  emptyTitle: { color: '#DC2626', marginTop: 10 },

  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalBox: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 20,
    width: '80%',
  },

  modalTitle: { fontWeight: 'bold', color: '#DC2626' },

  editInput: {
    backgroundColor: '#FEE2E2',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  saveBtn: {
    backgroundColor: '#DC2626',
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },

  cancelBtn: {
    padding: 10,
  },
});