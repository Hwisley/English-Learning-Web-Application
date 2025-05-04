select sct.original_title, sct.alias_title, stc.eng_sentence, stc.kor_sentence, stc.id
from script sct
right join script_mapping sm on sct.id = sm.script_id
left join sentence stc on sm.sentence_id = stc.id
where sct.original_title='UN Climate Change'
order by stc.id;