FILES=`find \`pwd\` -name index.md`
for FILE in $FILES
do
    NEWFILE=`echo $FILE | sed 's/index.md/0-index.md'`
    echo $NEWFILE
    g mv $FILE $NEWFILE
done
