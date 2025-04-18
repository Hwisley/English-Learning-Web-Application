select sct.eng_title, sct.kor_title, stc.eng_sentence, stc.kor_sentence
from script sct
right join script_mapping sm on sct.id = sm.script_id
left join sentence stc on sm.sentence_id = stc.id
where sct.eng_title='UN Climate Change';