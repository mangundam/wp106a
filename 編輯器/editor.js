const {Menu, dialog} = require('electron').remote
const fs = require('fs')

const template = [
  {
    label: 'File',
    submenu: [

      {
        label: 'Open',
        accelerator: 'CmdOrCtrl+O',
        click: function () {
          dialog.showOpenDialog(
              {   title:'開啟檔案',
                  filters: [
                      {name: 'Text', extensions: ['txt', 'md']},
                      {name: 'All Files', extensions: ['*']}
                  ]
              },
            function (fileName) {
              if (fileName === undefined) {
                console.log('No file selected')
                return
              }
              console.log('fileName=' + fileName)

              var filePath = document.getElementById('filePath')
              filePath.innerText = fileName
              fs.readFile(fileName.toString(), 'utf8', function (err, data) {
                if (err) window.alert('read fail!')
                var text = document.getElementById('text')
                text.value = data
              })
            }
          )
        }
      },
        {
            label: 'New File',
            accelerator: 'CmdOrCtrl+N',
            click: function () {
                dialog.showSaveDialog(
                    {   title:'新增檔案',
                        defaultPath:'.txt',
                        filters: [
                            {name: 'Text', extensions: ['txt', 'md']},
                            {name: 'Custom File Type', extensions: ['']},
                            {name: 'All Files', extensions: ['*']}
                        ]
                    },
                    function (fileName) {
                        var text = "Text in here"
                        fs.writeFile(fileName, text)

                        var filePath = document.getElementById('filePath')
                        filePath.innerText = fileName
                        fs.readFile(fileName.toString(), 'utf8', function (err, data) {
                            if (err) window.alert('read fail!')
                            var text = document.getElementById('text')
                            text.value = data
                        })
                    }


                )
            }
        },
      {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        click: function () {
          var fileName = document.getElementById('filePath').innerText
          if (fileName.trim().length === 0) {
              dialog.showSaveDialog(
                  {   title:'新增檔案',
                      defaultPath:'.txt',
                      filters: [
                          {name: 'Text', extensions: ['txt', 'md']},
                          {name: 'Custom File Type', extensions: ['']},
                          {name: 'All Files', extensions: ['*']}
                      ]
                  },
                  function (fileNameNew) {
                      var text = document.getElementById('text');
                      fs.writeFile(fileNameNew, text.value);

                      var filePath = document.getElementById('filePath')
                      filePath.innerText = fileNameNew
                      fs.readFile(fileNameNew.toString(), 'utf8', function (err, data) {
                          if (err) window.alert('read fail!')
                          var text = document.getElementById('text')
                          text.value = data
                      })
          })
          }
          var text = document.getElementById('text');
          fs.writeFile(fileName, text.value);
        }
      },

  {
    label: 'Save as New File',
    accelerator: 'CmdOrCtrl+Shift+S',
    click: function () {
      dialog.showSaveDialog(
          {   title:'另存新檔',
              defaultPath:'.txt',
              filters: [
                  {name: 'Text', extensions: ['txt', 'md']},
                  {name: 'Custom File Type', extensions: ['']},
                  {name: 'All Files', extensions: ['*']}
              ]
          },
          function (fileName) {
            var text = document.getElementById('text')
            fs.writeFile(fileName, text.value)

            var filePath = document.getElementById('filePath')
            filePath.innerText = fileName
            fs.readFile(fileName.toString(), 'utf8', function (err, data) {
              if (err) window.alert('read fail!')
              var text = document.getElementById('text')
              text.value = data
            })
          }


      )
    }
  },
      { role: 'close' },
]
},

  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    role: 'window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' }
    ]
  },
  {
    role: 'help',
    submenu: [ { label: 'Learn More' } ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
