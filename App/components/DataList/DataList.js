
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import RightActions from "../RightActions";
import { fetchTransactions } from '../utils/fetchTransactions'

export default function DataList(props) {

    const {
        context,
        styles,

    } = props;

    const updateRef = ref => {
        context._rowRefs.push(ref);
    };
    const close = () => {
        context._rowRefs.forEach(item => {
            if (item !== null)
                item.close()
        })
    };



    return (

        <FlatList
            refreshing={context.state.refreshing}
            onRefresh={() => fetchTransactions(context, null, 1)}
            data={context.state.transactions}
            keyExtractor={(item, index) => String(index)}
            ListEmptyComponent={<Text style={styles.emptyList}>Você não realizou transações ainda :)</Text>}
            showsVerticalScrollIndicator={false}
            renderItem={
                ({ item }) => (

                    <View style={styles.itensContainer}>
                        <Swipeable
                            ref={updateRef}

                            renderRightActions={(progress, dragX) =>
                                <RightActions
                                    progress={progress}
                                    dragX={dragX}
                                    onPress={() => {
                                        close();
                                        confirmDelete(context, item)
                                    }
                                    } />
                            }
                        >
                            <View style={{ backgroundColor: '#fff' }}>
                                <View style={styles.itemTop}>
                                    <Text style={item[1].valor > 0 ? [styles.textStyle, styles.receita] : [styles.textStyle, styles.despesa]}>{item[1].descricao}</Text>
                                    <Text style={item[1].valor > 0 ? [styles.textStyle, styles.receita] : [styles.textStyle, styles.despesa]}>R$ {item[1].valorDisplay}</Text>
                                </View>
                                <View style={styles.itemBottom}>
                                    <Text style={styles.data}>{item[1].data}</Text>
                                </View>
                            </View>
                        </Swipeable>
                    </View>
                )
            }
        />
    )
}
